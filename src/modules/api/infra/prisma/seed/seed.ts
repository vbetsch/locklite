import { usersToSeed } from '@api/infra/prisma/seed/data/users.data.seed';
import { upsertUserWithVaults } from '@api/infra/prisma/seed/scripts/upsert-user-with-vaults.seed';
import prisma from '@lib/prisma';

async function main(): Promise<void> {
  for (const seed of usersToSeed) {
    await upsertUserWithVaults(seed);
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
