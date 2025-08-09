import bcrypt from 'bcrypt';
import {PrismaClient, User, Vault} from '../generated';
import {usersToSeed} from "@prisma/seed/data/users.data.seed";
import {UserTypeSeed} from "@prisma/seed/types/user.type.seed";
import {VaultTypeSeed} from "@prisma/seed/types/vault.type.seed";

const prisma: PrismaClient = new PrismaClient();

async function upsertUserWithVaults(seed: UserTypeSeed): Promise<User> {
  const saltRounds: number = 12;
  const passwordHash: string = await bcrypt.hash(seed.passwordPlain, saltRounds);

  const user: User = await prisma.user.upsert({
    where: {email: seed.email},
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
    where: {userId: user.id},
    select: {uuid: true, label: true, secret: true, createdAt: true, userId: true},
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
