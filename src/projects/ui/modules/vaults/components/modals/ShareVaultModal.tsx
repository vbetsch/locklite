import React, { useState } from 'react';
import type { JSX } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
} from '@mui/material';
import ErrorMessage from '@ui/components/errors/ErrorMessage';
import AvatarMultiSelect from '@ui/modules/vaults/components/core/atoms/AvatarMultiSelect';
import { useMembers } from '@ui/modules/vaults/hooks/useMembers';
import type { VaultMemberModelDto } from '@shared/modules/vaults/models/vault-member.model.dto';
import { useApiCall } from '@ui/hooks/useApiCall';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';
import { UiLogger } from '@ui/ui.logger';
import { container } from 'tsyringe';
import { MockVaultsGateway } from '@ui/modules/vaults/gateways/mock.vaults.gateway';
import type { ShareVaultParamsDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.params.dto';
import type { ShareVaultPayloadDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.payload.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import CircularLoader from '@ui/components/loaders/CircularLoader';
import type { ShareVaultDataDto } from '@shared/modules/vaults/endpoints/share-vault/share-vault.data.dto';
import type { UsersStoreState } from '@ui/modules/users/stores/users.store';
import { usersStore } from '@ui/modules/users/stores/users.store';
import { useStore } from '@ui/stores/hooks/useStore';
import {
  vaultsStore,
  type VaultsStoreState,
} from '@ui/modules/vaults/stores/vaults.store';

type ShareVaultModalProps = {
  vault: VaultWithMembersModelDto;
  open: boolean;
  onClose: () => void;
};

export default function ShareVaultModal(
  props: ShareVaultModalProps
): JSX.Element {
  const vaultsState: VaultsStoreState = useStore(vaultsStore);
  const usersState: UsersStoreState = useStore(usersStore);
  const vaultsGateway: MockVaultsGateway = container.resolve(MockVaultsGateway);
  const allMembers: VaultMemberModelDto[] = useMembers(usersState.allUsers);
  const [globalError, setGlobalError] = useState<Error | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<VaultMemberModelDto[]>(
    useMembers(props.vault.members)
  );

  const setVault = (editedVault: VaultWithMembersModelDto): void => {
    vaultsStore.setState({
      vaults: vaultsState.vaults.map(vault =>
        vault.id === editedVault.id ? editedVault : vault
      ),
    });
  };

  const handleClose = (): void => {
    setGlobalError(null);
    props.onClose();
  };

  const handleChange = (next: VaultMemberModelDto[]): void => {
    setSelectedUsers([...next]);
  };

  const { execute: editVaultMembers, loading: editMembersLoading } = useApiCall<
    ShareVaultDataDto,
    HttpInputDto<ShareVaultParamsDto, ShareVaultPayloadDto>
  >({
    request: input => vaultsGateway.editVaultMembers(input!),
    onSuccess: data => {
      handleClose();
      setVault(data.vaultEdited);
    },
    onError: err => {
      setGlobalError(err);
      UiLogger.error({ message: 'Edit members failed', error: err });
    },
  });

  const handleSubmit = async (): Promise<void> => {
    setGlobalError(null);
    await editVaultMembers({
      params: {
        vaultId: props.vault.id,
      },
      payload: {
        sharedWithMembers: [...selectedUsers],
      },
    });
  };

  const globalLoading: boolean = editMembersLoading || usersState.usersLoading;

  return (
    <Dialog open={props.open} fullWidth maxWidth="xs">
      <DialogTitle>Share vault</DialogTitle>
      <DialogContent sx={{ paddingTop: '10px !important' }}>
        {globalLoading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularLoader loading={globalLoading} />
          </Box>
        ) : (
          <AvatarMultiSelect
            allMembers={allMembers}
            onChange={handleChange}
            label={'Members'}
            value={selectedUsers}
          />
        )}
      </DialogContent>
      <Box
        sx={{
          paddingLeft: 3,
          height: 15,
          width: '100%',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        <ErrorMessage error={globalError} />
      </Box>
      <DialogActions sx={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
        <Button onClick={handleClose} disabled={globalLoading}>
          Cancel
        </Button>
        <Button
          type={'submit'}
          variant="contained"
          onClick={handleSubmit}
          disabled={globalLoading}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
