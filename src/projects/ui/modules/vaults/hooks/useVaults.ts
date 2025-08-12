'use client';

import { useState } from 'react';
import { container } from 'tsyringe';
import type { VaultModelDto } from '@shared/modules/vaults/vault.model.dto';
import type { GetMyVaultsDataDto } from '@shared/modules/vaults/get-my-vaults/get-my-vaults.data.dto';
import { VaultsGateway } from '@ui/modules/vaults/gateways/vaults.gateway';
import { useApiFetch } from '@ui/hooks/useApiFetch';
import type { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';

export function useVaults(): {
  vaults: VaultModelDto[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const gateway: IVaultsGateway = container.resolve(VaultsGateway);
  const [vaults, setVaults] = useState<VaultModelDto[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { loading, refetch } = useApiFetch<GetMyVaultsDataDto>({
    request: () => gateway.getMyVaults(),
    onSuccess: data => setVaults(data.myVaults),
    onError: err => setError(err),
  });

  return { vaults, loading, error, refetch };
}
