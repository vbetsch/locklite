import React, { useState } from 'react';
import type { JSX } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import VaultCardContentLine from '@ui/modules/vaults/components/atoms/VaultCardContentLine';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import type { CreateVaultParamsDto } from '@shared/dto/input/params/create-vault.params.dto';
import { useApiCall } from '@ui/hooks/useApiCall';
import { VaultsGateway } from '@ui/modules/vaults/gateways/vaults.gateway';
import { container } from 'tsyringe';
import { UiLogger } from '@ui/ui.logger';
import ConfirmationModal from '@ui/components/modals/ConfirmationModal';
import type { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { VaultWithMembersModelDto } from '@shared/dto/models/vault.with-members.model.dto';
import VaultCardMembers from '@ui/modules/vaults/components/atoms/VaultCardMembers';
import EditMembersModal from '@ui/modules/vaults/components/modals/EditMembersModal';
import { useMembers } from '@ui/modules/vaults/hooks/useMembers';

type VaultCardProps = {
  // TODO: use VaultModelDto
  vault: VaultWithMembersModelDto;
  refetchVaults: () => Promise<void>;
};

export default function VaultCard(props: VaultCardProps): JSX.Element {
  const vaultsGateway: IVaultsGateway = container.resolve(VaultsGateway);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [vaultToDelete, setVaultToDelete] = useState<VaultModelDto | null>(
    null
  );
  const [openEditMembersModal, setOpenEditMembersModal] =
    useState<boolean>(false);

  const { execute: deleteVault, loading: deleteLoading } = useApiCall<
    number,
    CreateVaultParamsDto
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
        padding: '0.5rem',
      }}
    >
      <EditMembersModal
        vaultMembers={useMembers(props.vault.members)}
        open={openEditMembersModal}
        onClose={() => setOpenEditMembersModal(false)}
        refreshVaults={props.refetchVaults}
      />
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
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Button
          color={'error'}
          loading={deleteLoading}
          onClick={() => handleDeleteClick(props.vault)}
        >
          Delete
        </Button>
        <VaultCardMembers
          clickOnMembers={() => setOpenEditMembersModal(true)}
          maxMembers={3}
          members={useMembers(props.vault.members)}
        />
      </CardActions>
    </Card>
  );
}
