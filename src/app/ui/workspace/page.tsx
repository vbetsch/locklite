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
  Typography,
} from '@mui/material';
import AddVaultModal from '@ui/components/modals/AddVaultModal';
import { useVaults } from '@ui/hooks/useVaults';
import { useApiCall } from '@ui/hooks/api/useApiCall';
import { UiLogger } from '@ui/logs/ui.logger';
import type { CreateVaultParams } from '@shared/dto/input/params/create-vault.params';
import AddIcon from '@mui/icons-material/Add';
import DeleteVaultConfirmationModal from '@ui/components/modals/DeleteVaultConfirmationModal';
import SearchBar from '@ui/components/common/SearchBar';
import VaultCard from '@ui/components/vaults/molecules/VaultCard';
import VaultsList from '@ui/components/vaults/organisms/VaultsList';

export default function WorkspacePage(): JSX.Element {
  const { vaults, loading, error, refetch } = useVaults();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [vaultToDelete, setVaultToDelete] = useState<VaultModelDto | null>(
    null
  );

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
    onSuccess: async () => {
      setConfirmOpen(false);
      await refetch();
    },
    onError: err => {
      setConfirmOpen(false);
      UiLogger.error(null, err);
    },
  });

  const globalLoading: boolean = loading || deleteLoading;

  const handleDeleteClick = (vault: VaultModelDto): void => {
    setVaultToDelete(vault);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (vaultToDelete) {
      await deleteVault({ id: vaultToDelete.id });
    } else {
      setConfirmOpen(false);
    }
  };

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
      <DeleteVaultConfirmationModal
        open={confirmOpen}
        onSubmit={handleConfirmDelete}
        onClose={() => setConfirmOpen(false)}
        vaultLabel={vaultToDelete?.label || 'unknown'}
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
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
      <VaultsList
        loading={globalLoading}
        searchTerm={searchTerm}
        displayedVaults={filteredVaults}
        deleteVault={handleDeleteClick}
      />
    </Container>
  );
}
