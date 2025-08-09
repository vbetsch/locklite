import bcrypt from 'bcrypt';
import {PrismaClient, User, Vault} from '../generated';

type SeedVault = {
  readonly label: string;
  readonly secret: string;
};

type SeedUser = {
  readonly name: string | null;
  readonly email: string;
  readonly passwordPlain: string;
  readonly vaults: ReadonlyArray<SeedVault>;
};

const prisma: PrismaClient = new PrismaClient();

const usersToSeed: ReadonlyArray<SeedUser> = [
  {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    passwordPlain: 'Password!2345',
    vaults: [
      {label: 'Work credentials', secret: 'encrypted:work-secret-1'},
      {label: 'Personal banking', secret: 'encrypted:personal-secret-1'},
    ],
  },
  {
    name: 'Alan Turing',
    email: 'alan@example.com',
    passwordPlain: 'Password!6789',
    vaults: [
      {label: 'Prod access', secret: 'encrypted:prod-secret-1'},
      {label: 'Side projects', secret: 'encrypted:side-secret-1'},
    ],
  },
];

async function upsertUserWithVaults(seed: SeedUser): Promise<User> {
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
      data: seed.vaults.map((v: SeedVault) => ({
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
