import type { UserTypeSeed } from '@api/modules/seed/app/types/user.type.seed';
import { vaultsDataSeed } from './vaults.data.seed';

export const usersDataSeed: ReadonlyArray<UserTypeSeed> = [
  {
    name: 'Administrator',
    email: 'admin@example.com',
    passwordPlain: 'admin',
    vaults: [
      vaultsDataSeed.google,
      vaultsDataSeed.amazon,
      vaultsDataSeed.github,
    ],
  },
  {
    name: 'Standard User',
    email: 'user@example.com',
    passwordPlain: 'user',
    vaults: [
      vaultsDataSeed.netflix,
      vaultsDataSeed.disneyPlus,
      vaultsDataSeed.primeVideo,
    ],
  },
  {
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    passwordPlain: 'developer123',
    vaults: [
      vaultsDataSeed.github,
      vaultsDataSeed.stackoverflow,
      vaultsDataSeed.reddit,
    ],
  },
  {
    name: 'Lucas Martin',
    email: 'lucas.martin@example.com',
    passwordPlain: 'creator456',
    vaults: [
      vaultsDataSeed.youtube,
      vaultsDataSeed.netflix,
      vaultsDataSeed.primeVideo,
    ],
  },
  {
    name: 'Sophie Dubois',
    email: 'sophie.dubois@example.com',
    passwordPlain: 'designer789',
    vaults: [vaultsDataSeed.appleTv, vaultsDataSeed.disneyPlus],
  },
  {
    name: 'Thomas Bernard',
    email: 'thomas.bernard@example.com',
    passwordPlain: 'manager101',
    vaults: [vaultsDataSeed.amazon, vaultsDataSeed.netflix],
  },
  {
    name: 'Marie Leroy',
    email: 'marie.leroy@example.com',
    passwordPlain: 'analyst202',
    vaults: [vaultsDataSeed.google, vaultsDataSeed.stackoverflow],
  },
  {
    name: 'Alexandre Petit',
    email: 'alexandre.petit@example.com',
    passwordPlain: 'student303',
    vaults: [vaultsDataSeed.reddit, vaultsDataSeed.youtube],
  },
  {
    name: 'Camille Garcia',
    email: 'camille.garcia@example.com',
    passwordPlain: 'guest404',
    vaults: [],
  },
  {
    name: 'Nicolas Roux',
    email: 'nicolas.roux@example.com',
    passwordPlain: 'observer505',
    vaults: [],
  },
];
