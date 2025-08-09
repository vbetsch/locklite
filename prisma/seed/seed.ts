import {PrismaClient} from '@prisma/generated';
import {usersToSeed} from "@prisma/seed/data/users.data.seed";
import {upsertUserWithVaults} from "@prisma/seed/scripts/upsert-user-with-vaults.seed";

const prisma: PrismaClient = new PrismaClient();

async function main(): Promise<void> {
  for (const seed of usersToSeed) {
    await upsertUserWithVaults(prisma, seed);
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
