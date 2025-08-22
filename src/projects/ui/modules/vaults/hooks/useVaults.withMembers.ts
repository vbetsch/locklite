'use client';

import { useState } from 'react';
import { container } from 'tsyringe';
import { useApiFetch } from '@ui/hooks/useApiFetch';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import type { GetMyVaultsWithMembersDataDto } from '@shared/modules/vaults/endpoints/get-my-vaults/get-my-vaults.with-members.data.dto';
import { VaultsGateway } from '@ui/modules/vaults/gateways/vaults.gateway';
import type { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';

export function useVaultsWithMembers(): {
  vaults: VaultWithMembersModelDto[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const gateway: IVaultsGateway = container.resolve(VaultsGateway);
  const [vaults, setVaults] = useState<VaultWithMembersModelDto[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { loading, refetch } = useApiFetch<GetMyVaultsWithMembersDataDto>({
    request: () => gateway.getMyVaultsWithMembers(),
    onSuccess: data => setVaults(data.myVaults),
    onError: err => setError(err),
  });

  return { vaults, loading, error, refetch };
}
