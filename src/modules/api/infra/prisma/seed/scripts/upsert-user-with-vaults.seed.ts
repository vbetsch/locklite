import 'reflect-metadata';
import type { UserTypeSeed } from '@api/infra/prisma/seed/types/user.type.seed';
import type { User, Vault } from '@prisma/generated';
import { HashService } from '@api/domain/services/hash.service';
import { container } from 'tsyringe';
import { UsersRepository } from '@api/infra/repositories/users.repository';
import { VaultsRepository } from '@api/infra/repositories/vaults.repository';

const hashService: HashService = container.resolve(HashService);
const usersRepository: UsersRepository = container.resolve(UsersRepository);
const vaultsRepository: VaultsRepository = container.resolve(VaultsRepository);

export async function upsertUserWithVaults(seed: UserTypeSeed): Promise<User> {
  const passwordHash: string = await hashService.hash(seed.passwordPlain);

  const user: User = await usersRepository.createOrUpdate({
    email: seed.email,
    // eslint-disable-next-line no-undefined
    name: seed.name || undefined,
    password: passwordHash,
  });

  const existingVaults: ReadonlyArray<Vault> =
    await vaultsRepository.findByUserId({
      userId: user.id,
    });

  if (existingVaults.length === 0) {
    await vaultsRepository.createMany({
      userId: user.id,
      vaults: seed.vaults,
    });
  }

  return user;
}
