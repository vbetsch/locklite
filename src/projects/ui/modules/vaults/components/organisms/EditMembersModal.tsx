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
import AvatarMultiSelect from '@ui/modules/vaults/components/molecules/AvatarMultiSelect';
import { useUsers } from '@ui/modules/users/hooks/useUsers';
import { UiLogger } from '@ui/ui.logger';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import type { VaultWithMembersModelDto } from '@shared/dto/models/vault.with-members.model.dto';

type EditMembersModalProps = {
  currentVault: VaultWithMembersModelDto;
  open: boolean;
  onClose: () => void;
  refreshVaults: () => Promise<void>;
};

export default function EditMembersModal(
  props: EditMembersModalProps
): JSX.Element {
  // const { users: allUsers, loading, error, refetch } = useUsers();
  const { users: allUsers, loading } = useUsers();
  const [globalError, setGlobalError] = useState<Error | null>(null);

  const handleClose = (): void => {
    // setLabelError(null);
    setGlobalError(null);
    // setNewLabel('');
    // setNewSecret('');
    props.onClose();
  };

  const handleChange = (next: readonly Omit<UserModelDto, 'id'>[]): void => {
    UiLogger.debug('Next: ' + next);
    console.debug(next);
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
            allUsers={allUsers}
            onChange={handleChange}
            label={'Members'}
            value={props.currentVault.members}
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
