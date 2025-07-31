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
import type { CreateVaultRequestDto } from '@shared/dto/requests/create-vault.request.dto';
import ErrorMessage from '@ui/components/common/ErrorMessage';

type AddVaultModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddVaultModal(props: AddVaultModalProps): JSX.Element {
  const [newLabel, setNewLabel] = useState<string>('');
  const [newSecret, setNewSecret] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const vaultsGateway: VaultsGateway = container.resolve(VaultsGateway);

  async function onCreate(data: CreateVaultRequestDto): Promise<void> {
    setLoading(true);
    try {
      await vaultsGateway.createVault(data);
      props.onClose();
    } catch (error) {
      if (error instanceof Error) setError(error);
      else console.error('Unhandled API error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleConfirm = async (): Promise<void> => {
    await onCreate({ label: newLabel, secret: newSecret });
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Add a vault</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Label"
          fullWidth
          value={newLabel}
          onChange={e => setNewLabel(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Secret"
          fullWidth
          value={newSecret}
          onChange={e => setNewSecret(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <ErrorMessage error={error} />
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" loading={loading}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
