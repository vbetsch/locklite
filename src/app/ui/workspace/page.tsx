'use client';

import 'reflect-metadata';
import React, { useState } from 'react';
import type { JSX } from 'react';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import ErrorMessage from '@ui/components/common/ErrorMessage';
import CircularLoader from '@ui/components/common/CircularLoader';
import { VaultsGateway } from '@ui/gateways/vaults.gateway';
import { container } from 'tsyringe';
import type { GetMyVaultsResponseDto } from '@shared/dto/responses/get-my-vaults.response.dto';
import { useApi } from '@ui/hooks/useApi';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';

export default function WorkspacePage(): JSX.Element {
  const [vaults, setVaults] = useState<VaultModelDto[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const vaultsGateway: VaultsGateway = container.resolve(VaultsGateway);

  const { loading } = useApi<GetMyVaultsResponseDto>({
    request: () => vaultsGateway.getMyVaults(),
    onSuccess: data => setVaults(data.myVaults),
    onError: error => setError(error),
    deps: [],
  });

  return (
    <>
      <ErrorMessage error={error} />
      <CircularLoader loading={loading} />
      {!loading && vaults.length === 0 && (
        <Typography>No results found</Typography>
      )}
      {vaults.length > 0 && (
        <Grid container spacing={2}>
          {vaults.map(vault => (
            <Grid key={vault.id}>
              <Card sx={{ bgcolor: 'background.paper', height: '100%' }}>
                <CardHeader title={vault.label} />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ flex: 1 }}
                    >
                      Secret: {vault.secret}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
