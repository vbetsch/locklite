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

type EditMembersModalProps = {
  open: boolean;
  onClose: () => void;
  refreshVaults: () => Promise<void>;
};

export default function EditMembersModal(
  props: EditMembersModalProps
): JSX.Element {
  const [globalError, setGlobalError] = useState<Error | null>(null);

  const handleClose = (): void => {
    // setLabelError(null);
    setGlobalError(null);
    // setNewLabel('');
    // setNewSecret('');
    props.onClose();
  };

  const handleSubmit = async (): Promise<void> => {
    await setGlobalError(null);
    // await createVault({ label: newLabel, secret: newSecret });
  };

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit members</DialogTitle>
      <Form action={handleSubmit}>
        <DialogContent></DialogContent>
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
          {/*<Button type={'submit'} variant="contained" loading={loading}>*/}
          <Button type={'submit'} variant="contained">
            Edit
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
