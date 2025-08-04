import type { JSX } from 'react';
import React, { useState } from 'react';
import {
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
  refreshVaults: () => Promise<void>;
  onClose: () => void;
};

export default function AddVaultModal(props: AddVaultModalProps): JSX.Element {
  const [newLabel, setNewLabel] = useState<string>('');
  const [newSecret, setNewSecret] = useState<string>('');
  const vaultsGateway: VaultsGateway = container.resolve(VaultsGateway);

  const {
    execute: createVault,
    loading,
    error,
  } = useApiCall<CreateVaultDataDto, CreateVaultPayloadDto>({
    request: payload => vaultsGateway.createVault(payload!),
    onSuccess: async () => {
      props.onClose();
      await props.refreshVaults();
    },
    onError: err => UiLogger.error('Create vault failed', err),
  });

  const handleSubmit = async (): Promise<void> => {
    await createVault({ label: newLabel, secret: newSecret });
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Add a vault</DialogTitle>
      <Form action={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Label"
            fullWidth
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
          />
          <ErrorMessage error={error || null} />
          <TextField
            margin="dense"
            label="Secret"
            fullWidth
            value={newSecret}
            onChange={e => setNewSecret(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button type={'submit'} variant="contained" loading={loading}>
            Create
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
