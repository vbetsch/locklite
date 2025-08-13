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
import Form from 'next/form';
import ErrorMessage from '@ui/components/errors/ErrorMessage';
import AvatarMultiSelect from '@ui/modules/vaults/components/atoms/AvatarMultiSelect';
import { useUsers } from '@ui/modules/users/hooks/useUsers';
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

type EditMembersModalProps = {
  vault: VaultWithMembersModelDto;
  open: boolean;
  onClose: () => void;
  refreshVaults: () => Promise<void>;
};

export default function EditMembersModal(
  props: EditMembersModalProps
): JSX.Element {
  const vaultMembers: VaultMemberModelDto[] = useMembers(props.vault.members);
  const vaultsGateway: MockVaultsGateway = container.resolve(MockVaultsGateway);
  const { users: allUsers, loading: usersLoading } = useUsers();
  const [globalError, setGlobalError] = useState<Error | null>(null);
  const [selectedUsers, setSelectedUsers] =
    useState<VaultMemberModelDto[]>(vaultMembers);

  const handleClose = (): void => {
    // setLabelError(null);
    setSelectedUsers(vaultMembers);
    setGlobalError(null);
    // setNewLabel('');
    // setNewSecret('');
    props.onClose();
  };

  const handleChange = (next: VaultMemberModelDto[]): void => {
    setSelectedUsers([...next]);
  };

  const { execute: editVaultMembers, loading: editMembersLoading } = useApiCall<
    number,
    HttpInputDto<EditMembersParamsDto, EditMembersPayloadDto>
  >({
    request: input => vaultsGateway.editVaultMembers(input!),
    onSuccess: async () => {
      handleClose();
      await props.refreshVaults();
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

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit members</DialogTitle>
      <Form action={handleSubmit}>
        <DialogContent>
          <AvatarMultiSelect
            allMembers={useMembers(allUsers)}
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
            loading={editMembersLoading || usersLoading}
          >
            Edit
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
