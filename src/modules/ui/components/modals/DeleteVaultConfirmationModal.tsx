import React from 'react';
import type { JSX } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

type ModalProps = {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

type DeleteVaultConfirmationModalProps = {
  vaultLabel: string;
} & ModalProps;

export default function DeleteVaultConfirmationModal(
  props: DeleteVaultConfirmationModalProps
): JSX.Element {
  const handleSubmit = (): void => {
    props.onSubmit();
  };
  const handleClose = (): void => {
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Delete vault</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete « {props.vaultLabel} »?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleSubmit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
