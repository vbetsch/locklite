import type { JSX } from 'react';
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
import { VaultsGateway } from '@ui/gateways/vaults.gateway';
import { container } from 'tsyringe';
import ErrorMessage from '@ui/components/common/ErrorMessage';
import { UiLogger } from '@ui/logs/ui.logger';
import { useApiCall } from '@ui/hooks/api/useApiCall';
import type { CreateVaultDataDto } from '@shared/dto/output/data/create-vault.data.dto';
import type { CreateVaultPayloadDto } from '@shared/dto/input/payloads/create-vault.payload.dto';
import Form from 'next/form';

type AddVaultModalProps = {
  open: boolean;
  onClose: () => void;
  refreshVaults: () => Promise<void>;
};

export default function AddVaultModal(props: AddVaultModalProps): JSX.Element {
  const [newLabel, setNewLabel] = useState<string>('');
  const [newSecret, setNewSecret] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const vaultsGateway: VaultsGateway = container.resolve(VaultsGateway);

  const handleClose = (): void => {
    setError(null);
    setNewLabel('');
    setNewSecret('');
    props.onClose();
  };

  const { execute: createVault, loading } = useApiCall<
    CreateVaultDataDto,
    CreateVaultPayloadDto
  >({
    request: payload => vaultsGateway.createVault(payload!),
    onSuccess: async () => {
      handleClose();
      await props.refreshVaults();
    },
    onError: err => {
      setError(err);
      UiLogger.error('Create vault failed', err);
    },
  });

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    await createVault({ label: newLabel, secret: newSecret });
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Add a vault</DialogTitle>
      <Form action={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Label"
            fullWidth
            required
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Secret"
            fullWidth
            required
            value={newSecret}
            onChange={e => setNewSecret(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <Box sx={{ paddingLeft: 3, height: 15 }}>
          <ErrorMessage error={error} />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type={'submit'} variant="contained" loading={loading}>
            Create
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
