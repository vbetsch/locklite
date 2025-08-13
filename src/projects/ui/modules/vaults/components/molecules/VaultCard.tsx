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
import type { DeleteVaultParamsDto } from '@shared/modules/vaults/delete/delete-vault.params.dto';
import { useApiCall } from '@ui/hooks/useApiCall';
import { container } from 'tsyringe';
import { UiLogger } from '@ui/ui.logger';
import ConfirmationModal from '@ui/components/modals/ConfirmationModal';
import type { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import VaultCardMembers from '@ui/modules/vaults/components/atoms/VaultCardMembers';
import EditMembersModal from '@ui/modules/vaults/components/modals/EditMembersModal';
import { useMembers } from '@ui/modules/vaults/hooks/useMembers';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';
import type { UserModelDto } from '@shared/modules/users/user.model.dto';
import { MockVaultsGateway } from '@ui/modules/vaults/gateways/mock.vaults.gateway';

type VaultCardProps = {
  vault: VaultWithMembersModelDto;
  setVault: (vault: VaultWithMembersModelDto) => void;
  deleteVault: (vault: VaultWithMembersModelDto) => void;
  allUsers: UserModelDto[];
  usersLoading: boolean;
};

export default function VaultCard(props: VaultCardProps): JSX.Element {
  const vaultsGateway: IVaultsGateway = container.resolve(MockVaultsGateway);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [vaultToDelete, setVaultToDelete] =
    useState<VaultWithMembersModelDto | null>(null);
  const [openEditMembersModal, setOpenEditMembersModal] =
    useState<boolean>(false);

  const { execute: deleteVault, loading: deleteLoading } = useApiCall<
    number,
    HttpInputDto<DeleteVaultParamsDto, null>
  >({
    request: params => vaultsGateway.deleteVault(params!),
    onSuccess: () => {
      setConfirmOpen(false);
      if (vaultToDelete) props.deleteVault(vaultToDelete);
    },
    onError: err => {
      setConfirmOpen(false);
      UiLogger.error({ message: 'Delete vault failed', error: err });
    },
  });

  const handleDeleteClick = (vault: VaultWithMembersModelDto): void => {
    setVaultToDelete(vault);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (vaultToDelete) {
      await deleteVault({
        params: {
          id: vaultToDelete.id,
        },
        payload: null,
      });
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
        vault={props.vault}
        setVault={props.setVault}
        open={openEditMembersModal}
        onClose={() => setOpenEditMembersModal(false)}
        allUsers={props.allUsers}
        usersLoading={props.usersLoading}
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
