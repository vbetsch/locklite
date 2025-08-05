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

export type ConfirmationModalProps = {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  title: string;
  text: string;
  confirmation: 'delete' | 'confirm';
};

export default function ConfirmationModal(
  props: ConfirmationModalProps
): JSX.Element {
  const handleSubmit = (): void => {
    props.onSubmit();
  };
  const handleClose = (): void => {
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Typography>{props.text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {props.confirmation !== 'delete' && (
          <Button color="error" variant="contained" onClick={handleSubmit}>
            Delete
          </Button>
        )}
        {props.confirmation !== 'confirm' && (
          <Button color={'primary'} variant="contained" onClick={handleSubmit}>
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
