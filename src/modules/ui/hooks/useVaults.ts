'use client';

import { useState } from 'react';
import { container } from 'tsyringe';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import type { GetMyVaultsDataDto } from '@shared/dto/output/data/get-my-vaults.data.dto';
import { VaultsGateway } from '@ui/gateways/vaults.gateway';
import { useApiFetch } from '@ui/hooks/api/useApiFetch';

export function useVaults(): {
  vaults: VaultModelDto[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const gateway: VaultsGateway = container.resolve(VaultsGateway);
  const [vaults, setVaults] = useState<VaultModelDto[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { loading, refetch } = useApiFetch<GetMyVaultsDataDto>({
    request: () => gateway.getMyVaults(),
    onSuccess: data => setVaults(data.myVaults),
    onError: err => setError(err),
  });

  return { vaults, loading, error, refetch };
}
