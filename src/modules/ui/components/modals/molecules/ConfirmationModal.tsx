import React from 'react';
import type { JSX } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import type { AppModalProps } from '@ui/components/modals/atoms/AppModal';
import AppModal from '@ui/components/modals/atoms/AppModal';

type ConfirmationModalProps = {
  onSubmit: () => void;
  text: string;
  confirmation: 'delete' | 'confirm';
} & AppModalProps;

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
    <AppModal title={props.title} open={props.open} onClose={handleClose}>
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
    </AppModal>
  );
}
