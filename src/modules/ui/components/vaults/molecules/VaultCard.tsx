import React, { useState } from 'react';
import type { JSX } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import VaultCardContentLine from '@ui/components/vaults/atoms/VaultCardContentLine';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import DeleteVaultConfirmationModal from '@ui/components/modals/DeleteVaultConfirmationModal';
import type { CreateVaultParams } from '@shared/dto/input/params/create-vault.params';
import { useApiCall } from '@ui/hooks/api/useApiCall';
import { VaultsGateway } from '@ui/gateways/vaults.gateway';
import { container } from 'tsyringe';
import { UiLogger } from '@ui/logs/ui.logger';

type VaultCardProps = {
  vault: VaultModelDto;
  refetchVaults: () => Promise<void>;
};

export default function VaultCard(props: VaultCardProps): JSX.Element {
  const vaultsGateway: VaultsGateway = container.resolve(VaultsGateway);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [vaultToDelete, setVaultToDelete] = useState<VaultModelDto | null>(
    null
  );

  const { execute: deleteVault, loading: deleteLoading } = useApiCall<
    number,
    CreateVaultParams
  >({
    request: params => vaultsGateway.deleteVault(params!),
    onSuccess: async () => {
      setConfirmOpen(false);
      await props.refetchVaults();
    },
    onError: err => {
      setConfirmOpen(false);
      UiLogger.error(null, err);
    },
  });

  const handleDeleteClick = (vault: VaultModelDto): void => {
    setVaultToDelete(vault);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (vaultToDelete) {
      await deleteVault({ id: vaultToDelete.id });
    } else {
      setConfirmOpen(false);
    }
  };

  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
      }}
    >
      <DeleteVaultConfirmationModal
        open={confirmOpen}
        onSubmit={handleConfirmDelete}
        onClose={() => setConfirmOpen(false)}
        vaultLabel={vaultToDelete?.label || 'unknown'}
      />
      <CardHeader title={props.vault.label} />
      <CardContent>
        <VaultCardContentLine vaultSecret={props.vault.secret} />
      </CardContent>
      <CardActions>
        <Button
          color={'error'}
          loading={deleteLoading}
          onClick={() => handleDeleteClick(props.vault)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
