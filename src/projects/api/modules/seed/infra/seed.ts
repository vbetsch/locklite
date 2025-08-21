import 'reflect-metadata';
import { usersToSeed } from '@api/modules/seed/app/data/users.data.seed';
import prisma from '@lib/prisma';
import { container } from 'tsyringe';
import { UpsertUserWithVaultsUseCase } from '@api/modules/seed/domain/upsert-user-with-vaults.usecase';

const upsertUserWithVaultsUseCase: UpsertUserWithVaultsUseCase =
  container.resolve(UpsertUserWithVaultsUseCase);

async function main(): Promise<void> {
  for (const seed of usersToSeed) {
    await upsertUserWithVaultsUseCase.handle(seed);
  }
}

void main()
  .then(async (): Promise<void> => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown): Promise<void> => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
