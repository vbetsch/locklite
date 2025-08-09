import type { UserTypeSeed } from '@api/infra/prisma/seed/types/user.type.seed';

export const usersToSeed: ReadonlyArray<UserTypeSeed> = [
  {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    passwordPlain: 'Password!2345',
    vaults: [
      { label: 'Work credentials', secret: 'encrypted:work-secret-1' },
      { label: 'Personal banking', secret: 'encrypted:personal-secret-1' },
    ],
  },
  {
    name: 'Alan Turing',
    email: 'alan@example.com',
    passwordPlain: 'Password!6789',
    vaults: [
      { label: 'Prod access', secret: 'encrypted:prod-secret-1' },
      { label: 'Side projects', secret: 'encrypted:side-secret-1' },
    ],
  },
];
