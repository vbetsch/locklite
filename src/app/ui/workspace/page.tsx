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
        <Grid
          container
          spacing={{ xs: 1, md: 2, lg: 3, xl: 4 }}
          columns={{ xs: 1, md: 2, lg: 3, xl: 3 }}
        >
          {vaults.map(vault => (
            <Grid key={vault.id} size={1}>
              <Card
                key={vault.id}
                sx={{
                  bgcolor: 'background.paper',
                }}
              >
                <CardHeader title={vault.label} />
                <CardContent>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
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
