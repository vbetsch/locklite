'use client';

import 'reflect-metadata';
import React, { useMemo, useState } from 'react';
import type { JSX } from 'react';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import ErrorMessage from '@ui/components/common/ErrorMessage';
import CircularLoader from '@ui/components/common/CircularLoader';
import { VaultsGateway } from '@ui/gateways/vaults.gateway';
import { container } from 'tsyringe';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import AddVaultModal from '@ui/components/modals/AddVaultModal';
import type { GetMyVaultsDataDto } from '@shared/dto/output/data/get-my-vaults.data.dto';
import { UiLogger } from '@ui/logs/ui.logger';
import { useApiFetch } from '@ui/hooks/useApiFetch';

export default function WorkspacePage(): JSX.Element {
  const [vaults, setVaults] = useState<VaultModelDto[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const vaultsGateway: VaultsGateway = container.resolve(VaultsGateway);

  const { loading, refetch } = useApiFetch<GetMyVaultsDataDto>({
    request: () => vaultsGateway.getMyVaults(),
    onSuccess: data => setVaults(data.myVaults),
    onError: error => setError(error),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const filteredVaults: VaultModelDto[] = useMemo(
    () =>
      vaults.filter(v =>
        v.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [vaults, searchTerm]
  );

  async function onDelete(id: string): Promise<void> {
    setDeleteLoading(true);
    try {
      await vaultsGateway.deleteVault(id);
      await refetch();
    } catch (error) {
      if (error instanceof Error) setError(error);
      else UiLogger.error('Unhandled API error: ', error);
    } finally {
      setDeleteLoading(false);
    }
  }

  async function deleteVault(id: string): Promise<void> {
    await onDelete(id);
  }

  return (
    <Container
      sx={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      <AddVaultModal
        open={open}
        onClose={async () => {
          setOpen(false);
          await refetch();
        }}
      />
      <Typography variant={'h3'} textAlign={'left'}>
        My vaults
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          width: '100%',
        }}
      >
        <TextField
          fullWidth
          placeholder="Search…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ minWidth: 150 }}
          onClick={() => setOpen(true)}
        >
          Add a vault
        </Button>
      </Box>
      <ErrorMessage error={error} />
      <CircularLoader loading={loading || deleteLoading} />
      {!loading && !deleteLoading && filteredVaults.length === 0 && (
        <Typography>
          {searchTerm ? 'No vaults match your search' : 'No results found'}
        </Typography>
      )}
      {filteredVaults.length > 0 && (
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 3, xl: 4 }}
          columns={{ xs: 1, md: 2, lg: 3, xl: 3 }}
          overflow={'auto'}
          height={'65vh'}
        >
          {filteredVaults.map(vault => (
            <Grid key={vault.id} size={1}>
              <Card
                sx={{
                  bgcolor: 'background.paper',
                }}
              >
                <CardHeader title={vault.label} />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Secret:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily={'monospace'}
                      overflow={'scroll'}
                      textOverflow={'ellipsis'}
                    >
                      {vault.secret}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button color={'error'} onClick={() => deleteVault(vault.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
