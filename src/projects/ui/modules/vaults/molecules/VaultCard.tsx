import React, { useState } from 'react';
import type { JSX } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import VaultCardContentLine from '@ui/modules/vaults/atoms/VaultCardContentLine';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import type { CreateVaultParams } from '@shared/dto/input/params/create-vault.params';
import { useApiCall } from '@ui/hooks/api/useApiCall';
import { VaultsGateway } from '@ui/gateways/vaults.gateway';
import { container } from 'tsyringe';
import { UiLogger } from '@ui/logs/ui.logger';
import ConfirmationModal from '@ui/components/modals/molecules/ConfirmationModal';

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
      <ConfirmationModal
        open={confirmOpen}
        onSubmit={handleConfirmDelete}
        onClose={() => setConfirmOpen(false)}
        title={'Delete vault'}
        text={`Are you sure you want to delete « ${vaultToDelete?.label || 'unknown'} »?`}
        confirmation={'delete'}
      />
      <CardHeader title={props.vault.label} />
      <CardContent>
        <VaultCardContentLine property={'Secret'} value={props.vault.secret} />
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
