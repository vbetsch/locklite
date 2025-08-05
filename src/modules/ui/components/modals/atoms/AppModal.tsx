import React from 'react';
import type { JSX } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import type { SharedChildrenProps } from '@shared/props/SharedChildrenProps';

export type AppModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
} & SharedChildrenProps;

export default function AppModal(props: AppModalProps): JSX.Element {
  const handleClose = (): void => {
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>{props.title}</DialogTitle>
      {props.children}
    </Dialog>
  );
}
