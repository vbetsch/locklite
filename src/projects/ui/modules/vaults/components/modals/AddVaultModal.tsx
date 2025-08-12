import type { JSX, RefObject } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { VaultsGateway } from '@ui/modules/vaults/gateways/vaults.gateway';
import { container } from 'tsyringe';
import ErrorMessage from '@ui/components/errors/ErrorMessage';
import { UiLogger } from '@ui/ui.logger';
import { useApiCall } from '@ui/hooks/useApiCall';
import type { CreateVaultDataDto } from '@shared/modules/vaults/create/create-vault.data.dto';
import type { CreateVaultPayloadDto } from '@shared/modules/vaults/create/create-vault.payload.dto';
import Form from 'next/form';
import { BusinessError } from '@shared/errors/business-error';
import type { IVaultsGateway } from '@ui/modules/vaults/gateways/abstract/vaults.gateway.interface';
import type { HttpInputDto } from '@shared/dto/input/http-input.dto';

type AddVaultModalProps = {
  open: boolean;
  onClose: () => void;
  refreshVaults: () => Promise<void>;
};

export default function AddVaultModal(props: AddVaultModalProps): JSX.Element {
  const delayToFocusFirstInput: number = 100;

  const [newLabel, setNewLabel] = useState<string>('');
  const [newSecret, setNewSecret] = useState<string>('');
  const [labelError, setLabelError] = useState<Error | null>(null);
  const [globalError, setGlobalError] = useState<Error | null>(null);
  const vaultsGateway: IVaultsGateway = container.resolve(VaultsGateway);
  const labelInputRef: RefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);

  const handleClose = (): void => {
    setLabelError(null);
    setGlobalError(null);
    setNewLabel('');
    setNewSecret('');
    props.onClose();
  };

  const { execute: createVault, loading } = useApiCall<
    CreateVaultDataDto,
    HttpInputDto<null, CreateVaultPayloadDto>
  >({
    request: input => vaultsGateway.createVault(input!),
    onSuccess: async () => {
      handleClose();
      await props.refreshVaults();
    },
    onError: err => {
      if (err instanceof BusinessError && err.message.includes('label')) {
        setLabelError(err);
      } else {
        setGlobalError(err);
      }
      UiLogger.error('Create vault failed', err);
    },
  });

  const handleSubmit = async (): Promise<void> => {
    setGlobalError(null);
    await createVault({
      params: null,
      payload: {
        label: newLabel,
        secret: newSecret,
      },
    });
  };

  useEffect(() => {
    if (props.open) {
      setTimeout(() => {
        labelInputRef.current?.focus();
      }, delayToFocusFirstInput);
    }
  }, [props.open]);

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add a vault</DialogTitle>
      <Form action={handleSubmit}>
        <DialogContent>
          <TextField
            inputRef={labelInputRef}
            margin="dense"
            label="Label"
            fullWidth
            required
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            error={!!globalError || !!labelError}
            helperText={labelError ? labelError.message : ''}
          />
          <TextField
            error={!!globalError}
            margin="dense"
            label="Secret"
            fullWidth
            required
            value={newSecret}
            onChange={e => setNewSecret(e.target.value)}
            sx={{ mt: 2 }}
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
            Create
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
