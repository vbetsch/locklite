import React from 'react';
import type { JSX } from 'react';
import { Dialog } from '@mui/material';
import type { SharedChildrenProps } from '@shared/props/SharedChildrenProps';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
} & SharedChildrenProps;

export default function Modal(props: ModalProps): JSX.Element {
  const handleClose = (): void => {
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      {props.children}
    </Dialog>
  );
}
