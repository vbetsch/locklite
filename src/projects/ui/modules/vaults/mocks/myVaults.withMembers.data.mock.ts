import type { VaultWithMembersModelDto } from '@shared/dto/models/vault.with-members.model.dto';

// TODO: remove it
export const myVaultsWithMembersDataMock: VaultWithMembersModelDto[] = [
  {
    id: 'v1',
    label: 'Google Account',
    secret: 'p@ssW0rd123!',
    members: [
      { email: 'alice.smith@example.com', name: 'Alice Smith' },
      { email: 'bob.johnson@example.com', name: 'Bob Johnson' },
    ],
  },
  {
    id: 'v2',
    label: 'Amazon Seller',
    secret: 'AmzS3ll3r!2024',
    members: [
      { email: 'charlie.davis@example.com' },
      { email: 'diana.wilson@example.com', name: 'Diana Wilson' },
    ],
  },
  {
    id: 'v3',
    label: 'GitHub Repo',
    secret: 'GhT0k3n$eCur3',
    members: [
      { email: 'edward.taylor@example.com', name: 'Edward Taylor' },
      { email: 'bob.johnson@example.com', name: 'Bob Johnson' },
    ],
  },
  {
    id: 'v4',
    label: 'Dropbox Storage',
    secret: 'Dr0pb0x!Safe',
    members: [
      { email: 'alice.smith@example.com', name: 'Alice Smith' },
      { email: 'charlie.davis@example.com' },
    ],
  },
  {
    id: 'v5',
    label: 'Netflix Family',
    secret: 'N3tfLix#P@ss',
    members: [
      { email: 'diana.wilson@example.com', name: 'Diana Wilson' },
      { email: 'edward.taylor@example.com', name: 'Edward Taylor' },
    ],
  },
];
