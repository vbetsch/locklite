'use client';

import 'reflect-metadata';
import React, { useState } from 'react';
import type { JSX } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import ErrorMessage from '@ui/components/common/ErrorMessage';
import CircularLoader from '@ui/components/common/CircularLoader';
import { VaultsGateway } from '@ui/gateways/vaults.gateway';
import { container } from 'tsyringe';
import type { GetMyVaultsResponseDto } from '@shared/dto/responses/get-my-vaults.response.dto';
import { useApi } from '@ui/hooks/useApi';

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
      <List>
        {vaults.length > 0 ? (
          vaults.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <Typography>{item.label}</Typography>
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No results found" />
          </ListItem>
        )}
      </List>
    </>
  );
}
