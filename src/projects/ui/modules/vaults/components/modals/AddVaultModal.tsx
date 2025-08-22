import type { JSX, RefObject } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { container } from 'tsyringe';
import ErrorMessage from '@ui/components/errors/ErrorMessage';
import { UiLogger } from '@ui/ui.logger';
import { useApiCall } from '@ui/hooks/useApiCall';
import type { CreateVaultDataDto } from '@shared/modules/vaults/endpoints/create/create-vault.data.dto';
import type { CreateVaultPayloadDto } from '@shared/modules/vaults/endpoints/create/create-vault.payload.dto';
import { BusinessError } from '@shared/errors/business-error';
import type { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import type { VaultsStoreState } from '@ui/modules/vaults/stores/vaults.store';
import { vaultsStore } from '@ui/modules/vaults/stores/vaults.store';
import { useStore } from '@ui/stores/hooks/useStore';
import AvatarMultiSelect from '@ui/modules/vaults/components/core/atoms/AvatarMultiSelect';
import type { VaultMemberModelDto } from '@shared/modules/vaults/models/vault-member.model.dto';
import { useMembers } from '@ui/modules/vaults/hooks/useMembers';
import type { UsersStoreState } from '@ui/modules/users/stores/users.store';
import { usersStore } from '@ui/modules/users/stores/users.store';
import { VaultsGateway } from '@ui/modules/vaults/gateways/vaults.gateway';

type AddVaultModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddVaultModal(props: AddVaultModalProps): JSX.Element {
  const delayToFocusFirstInput: number = 100;

  const usersState: UsersStoreState = useStore(usersStore);
  const vaultsState: VaultsStoreState = useStore(vaultsStore);
  const [newLabel, setNewLabel] = useState<string>('');
  const [newSecret, setNewSecret] = useState<string>('');
  const [labelError, setLabelError] = useState<Error | null>(null);
  const [globalError, setGlobalError] = useState<Error | null>(null);
  const vaultsGateway: IVaultsGateway = container.resolve(VaultsGateway);
  const labelInputRef: RefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);
  const [selectedUsers, setSelectedUsers] = useState<VaultMemberModelDto[]>([]);
  const allMembers: VaultMemberModelDto[] = useMembers(usersState.allUsers);

  const handleClose = (): void => {
    setSelectedUsers([]);
    setLabelError(null);
    setGlobalError(null);
    setNewLabel('');
    setNewSecret('');
    props.onClose();
  };

  const handleChange = (next: VaultMemberModelDto[]): void => {
    setSelectedUsers(next);
  };

  const addVault = (vaultCreated: VaultWithMembersModelDto): void => {
    vaultsStore.setState({
      vaults: [...vaultsState.vaults, vaultCreated],
    });
  };

  const { execute: createVault, loading } = useApiCall<
    CreateVaultDataDto,
    HttpInputDto<null, CreateVaultPayloadDto>
  >({
    request: input => vaultsGateway.createVault(input!),
    onSuccess: data => {
      handleClose();
      addVault(data.vaultCreated);
    },
    onError: err => {
      if (err instanceof BusinessError && err.message.includes('label')) {
        setLabelError(err);
      } else {
        setGlobalError(err);
      }
      UiLogger.error({ message: 'Create vault failed', error: err });
    },
  });

  const handleSubmit = async (): Promise<void> => {
    setGlobalError(null);
    await createVault({
      params: null,
      payload: {
        label: newLabel,
        secret: newSecret,
        members: selectedUsers,
      },
    });
  };

  useEffect(() => {
    if (props.open) {
      setTimeout(() => {
        labelInputRef.current?.focus();
      }, delayToFocusFirstInput);
    }
  }, [props.open]);

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add a vault</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          mt: 2,
        }}
      >
        <TextField
          inputRef={labelInputRef}
          margin="dense"
          label="Label"
          fullWidth
          required
          value={newLabel}
          onChange={e => setNewLabel(e.target.value)}
          error={!!globalError || !!labelError}
          helperText={labelError ? labelError.message : ''}
        />
        <TextField
          error={!!globalError}
          label="Secret"
          fullWidth
          required
          value={newSecret}
          onChange={e => setNewSecret(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              void handleSubmit();
            }
          }}
        />
        <AvatarMultiSelect
          allMembers={allMembers}
          onChange={handleChange}
          label={'Members'}
          value={selectedUsers}
        />
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type={'submit'}
          variant="contained"
          loading={loading}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
