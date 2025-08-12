import type { UserTypeSeed } from '@api/modules/seed/app/types/user.type.seed';

export const usersToSeed: ReadonlyArray<UserTypeSeed> = [
  {
    name: 'Administrator',
    email: 'admin@example.com',
    passwordPlain: 'admin',
    vaults: [
      { label: 'Google', secret: 'g0ogle' },
      { label: 'Amazon', secret: 'am4z0n' },
    ],
  },
  {
    name: 'Standard User',
    email: 'user@example.com',
    passwordPlain: 'user',
    vaults: [
      { label: 'Netflix', secret: 'n3tfl1x' },
      { label: 'Disney +', secret: 'disney.plu$' },
    ],
  },
];
