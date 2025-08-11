'use client';

import { useState } from 'react';
import { container } from 'tsyringe';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import type { GetMyVaultsDataDto } from '@shared/dto/output/data/get-my-vaults.data.dto';
import { useApiFetch } from '@ui/hooks/useApiFetch';
import { MockVaultsGateway } from '@ui/modules/vaults/gateways/mock.vaults.gateway';

// TODO: remove it
export function useVaultsWithMembers(): {
  vaults: VaultModelDto[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const gateway: MockVaultsGateway = container.resolve(MockVaultsGateway);
  const [vaults, setVaults] = useState<VaultModelDto[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { loading, refetch } = useApiFetch<GetMyVaultsDataDto>({
    request: () => gateway.getMyVaultsWithMembers(),
    onSuccess: data => setVaults(data.myVaults),
    onError: err => setError(err),
  });

  return { vaults, loading, error, refetch };
}
