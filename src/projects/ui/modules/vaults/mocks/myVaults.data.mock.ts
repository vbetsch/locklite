import type { VaultModelDto } from '@shared/modules/vaults/vault.model.dto';

export const myVaultsDataMock: VaultModelDto[] = [
  { id: 'v1', label: 'Google Account', secret: 'p@ssW0rd123!' },
  { id: 'v2', label: 'Amazon Seller', secret: 'AmzS3ll3r!2024' },
  { id: 'v3', label: 'GitHub Repo', secret: 'GhT0k3n$eCur3' },
  { id: 'v4', label: 'Dropbox Storage', secret: 'Dr0pb0x!Safe' },
  { id: 'v5', label: 'Netflix Family', secret: 'N3tfLix#P@ss' },
];
