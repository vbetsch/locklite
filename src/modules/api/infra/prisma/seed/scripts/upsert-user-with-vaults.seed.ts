import 'reflect-metadata';
import type { UserTypeSeed } from '@api/infra/prisma/seed/types/user.type.seed';
import type { VaultTypeSeed } from '@api/infra/prisma/seed/types/vault.type.seed';
import type { User, Vault } from '@prisma/generated';
import prisma from '@lib/prisma';
import { HashService } from '@api/domain/services/hash.service';
import { container } from 'tsyringe';

const hashService: HashService = container.resolve(HashService);

export async function upsertUserWithVaults(seed: UserTypeSeed): Promise<User> {
  const passwordHash: string = await hashService.hash(seed.passwordPlain);

  const user: User = await prisma.user.upsert({
    where: { email: seed.email },
    update: {
      name: seed.name,
      password: passwordHash,
    },
    create: {
      name: seed.name,
      email: seed.email,
      password: passwordHash,
    },
  });

  const existingVaults: ReadonlyArray<Vault> = await prisma.vault.findMany({
    where: { userId: user.id },
    select: {
      uuid: true,
      label: true,
      secret: true,
      createdAt: true,
      userId: true,
    },
  });

  if (existingVaults.length === 0) {
    await prisma.vault.createMany({
      data: seed.vaults.map((v: VaultTypeSeed) => ({
        label: v.label,
        secret: v.secret,
        userId: user.id,
      })),
      skipDuplicates: true,
    });
  }

  return user;
}
