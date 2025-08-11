'use client';

import { useState } from 'react';
import { container } from 'tsyringe';
import { useApiFetch } from '@ui/hooks/useApiFetch';
import { MockVaultsGateway } from '@ui/modules/vaults/gateways/mock.vaults.gateway';
import type { VaultWithMembersModelDto } from '@shared/dto/models/vault.with-members.model.dto';
import type { GetMyVaultsWithMembersDataDto } from '@shared/dto/output/data/get-my-vaults.with-members.data.dto';

// TODO: remove it
export function useVaultsWithMembers(): {
  vaults: VaultWithMembersModelDto[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const gateway: MockVaultsGateway = container.resolve(MockVaultsGateway);
  const [vaults, setVaults] = useState<VaultWithMembersModelDto[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { loading, refetch } = useApiFetch<GetMyVaultsWithMembersDataDto>({
    request: () => gateway.getMyVaultsWithMembers(),
    onSuccess: data => setVaults(data.myVaults),
    onError: err => setError(err),
  });

  return { vaults, loading, error, refetch };
}
