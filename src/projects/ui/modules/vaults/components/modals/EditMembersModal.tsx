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
import type { VaultMemberModelDto } from '@shared/modules/vaults/vault-member.model.dto';

type EditMembersModalProps = {
  vaultMembers: VaultMemberModelDto[];
  open: boolean;
  onClose: () => void;
  refreshVaults: () => Promise<void>;
};

export default function EditMembersModal(
  props: EditMembersModalProps
): JSX.Element {
  const { users: allUsers, loading } = useUsers();
  const [globalError, setGlobalError] = useState<Error | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<VaultMemberModelDto[]>(
    props.vaultMembers
  );

  const handleClose = (): void => {
    // setLabelError(null);
    setSelectedUsers(props.vaultMembers);
    setGlobalError(null);
    // setNewLabel('');
    // setNewSecret('');
    props.onClose();
  };

  const handleChange = (next: VaultMemberModelDto[]): void => {
    setSelectedUsers([...next]);
  };

  const handleSubmit = async (): Promise<void> => {
    await setGlobalError(null);
    // await createVault({ label: newLabel, secret: newSecret });
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
          <Button type={'submit'} variant="contained" loading={loading}>
            Edit
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
