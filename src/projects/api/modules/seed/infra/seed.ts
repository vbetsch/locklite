import 'reflect-metadata';
import prisma from '@lib/prisma';
import { container } from 'tsyringe';
import { UpsertUserWithVaultsUseCase } from '@api/modules/seed/domain/upsert-user-with-vaults.usecase';
import { usersDataSeed } from '@api/modules/seed/app/data/users.data.seed';
import { ApiLogger } from '@api/app/api.logger';

const upsertUserWithVaultsUseCase: UpsertUserWithVaultsUseCase =
  container.resolve(UpsertUserWithVaultsUseCase);

async function main(): Promise<void> {
  for (const seed of usersDataSeed) {
    await upsertUserWithVaultsUseCase.handle(seed);
  }
}

void main()
  .then(async (): Promise<void> => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown): Promise<void> => {
    ApiLogger.error({ error: error });
    await prisma.$disconnect();
    process.exit(1);
  });
