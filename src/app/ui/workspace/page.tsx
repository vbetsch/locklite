'use client';

import 'reflect-metadata';
import React, { useState } from 'react';
import type { JSX } from 'react';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import ErrorMessage from '@ui/components/common/ErrorMessage';
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
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import AddVaultModal from '@ui/components/modals/AddVaultModal';
import { useVaults } from '@ui/hooks/useVaults';
import { useApiCall } from '@ui/hooks/api/useApiCall';
import { UiLogger } from '@ui/logs/ui.logger';
import type { CreateVaultParams } from '@shared/dto/input/params/create-vault.params';
import AddIcon from '@mui/icons-material/Add';

export default function WorkspacePage(): JSX.Element {
  const { vaults, loading, error, refetch } = useVaults();
  const [open, setOpen] = useState(false);
  const vaultsGateway: VaultsGateway = container.resolve(VaultsGateway);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredVaults: VaultModelDto[] = vaults.filter(v =>
    v.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { execute: deleteVault, loading: deleteLoading } = useApiCall<
    number,
    CreateVaultParams
  >({
    request: params => vaultsGateway.deleteVault(params!),
    onSuccess: () => refetch(),
    onError: err => UiLogger.error(null, err),
  });

  const globalLoading: boolean = loading || deleteLoading;

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
        onClose={() => setOpen(false)}
        refreshVaults={refetch}
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
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ minWidth: 150 }}
          onClick={() => setOpen(true)}
        >
          Add a vault
        </Button>
      </Box>
      <ErrorMessage error={error} />
      {globalLoading && (
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 3, xl: 4 }}
          columns={{ xs: 1, md: 2, lg: 3, xl: 3 }}
          alignContent={'start'}
          overflow={'auto'}
          height={'65vh'}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid key={i} size={1}>
              <Card sx={{ bgcolor: 'background.paper' }}>
                <CardHeader title={<Skeleton variant="text" width="80%" />} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" width={80} height={32} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!globalLoading && filteredVaults.length === 0 && (
        <Typography>
          {searchTerm ? 'No vaults match your search' : 'No results found'}
        </Typography>
      )}
      {!globalLoading && filteredVaults.length > 0 && (
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 3, xl: 4 }}
          columns={{ xs: 1, md: 2, lg: 3, xl: 3 }}
          alignContent={'start'}
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
                  <Button
                    color={'error'}
                    onClick={() => deleteVault({ id: vault.id })}
                  >
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
