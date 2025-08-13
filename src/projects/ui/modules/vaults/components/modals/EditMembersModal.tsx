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
import AvatarMultiSelect from '@ui/modules/vaults/components/atoms/AvatarMultiSelect';
import { useMembers } from '@ui/modules/vaults/hooks/useMembers';
import type { VaultMemberModelDto } from '@shared/modules/vaults/models/vault-member.model.dto';
import { useApiCall } from '@ui/hooks/useApiCall';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';
import { UiLogger } from '@ui/ui.logger';
import { container } from 'tsyringe';
import { MockVaultsGateway } from '@ui/modules/vaults/gateways/mock.vaults.gateway';
import type { EditMembersParamsDto } from '@shared/modules/vaults/edit-members/edit-members.params.dto';
import type { EditMembersPayloadDto } from '@shared/modules/vaults/edit-members/edit-members.payload.dto';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';
import CircularLoader from '@ui/components/loaders/CircularLoader';
import type { UserModelDto } from '@shared/modules/users/user.model.dto';
import type { EditMembersDataDto } from '@shared/modules/vaults/edit-members/edit-members.data.dto';

type EditMembersModalProps = {
  vault: VaultWithMembersModelDto;
  setVault: (vault: VaultWithMembersModelDto) => void;
  open: boolean;
  onClose: () => void;
  allUsers: UserModelDto[];
  usersLoading: boolean;
};

export default function EditMembersModal(
  props: EditMembersModalProps
): JSX.Element {
  const vaultsGateway: MockVaultsGateway = container.resolve(MockVaultsGateway);
  const vaultMembers: VaultMemberModelDto[] = useMembers(props.vault.members);
  const allMembers: VaultMemberModelDto[] = useMembers(props.allUsers);
  const [globalError, setGlobalError] = useState<Error | null>(null);
  const [selectedUsers, setSelectedUsers] =
    useState<VaultMemberModelDto[]>(vaultMembers);

  const handleClose = (): void => {
    setSelectedUsers(vaultMembers);
    setGlobalError(null);
    props.onClose();
  };

  const handleChange = (next: VaultMemberModelDto[]): void => {
    setSelectedUsers([...next]);
  };

  const { execute: editVaultMembers, loading: editMembersLoading } = useApiCall<
    EditMembersDataDto,
    HttpInputDto<EditMembersParamsDto, EditMembersPayloadDto>
  >({
    request: input => vaultsGateway.editVaultMembers(input!),
    onSuccess: data => {
      handleClose();
      props.setVault(data.vaultEdited);
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
        id: props.vault.id,
      },
      payload: {
        overrideMembers: [...selectedUsers],
      },
    });
  };

  const globalLoading: boolean = editMembersLoading || props.usersLoading;

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="xs">
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
