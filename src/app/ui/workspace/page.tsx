'use client';

import 'reflect-metadata';
import React, { useState } from 'react';
import type { JSX } from 'react';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import ErrorMessage from '@ui/components/common/ErrorMessage';
import { Box, Button, Container, Typography } from '@mui/material';
import AddVaultModal from '@ui/components/modals/AddVaultModal';
import { useVaults } from '@ui/hooks/useVaults';
import AddIcon from '@mui/icons-material/Add';
import SearchBar from '@ui/components/common/SearchBar';
import VaultsList from '@ui/components/vaults/organisms/VaultsList';

export default function WorkspacePage(): JSX.Element {
  const { vaults, loading, error, refetch } = useVaults();
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredVaults: VaultModelDto[] = vaults.filter(v =>
    v.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        loading={loading}
        searchTerm={searchTerm}
        displayedVaults={filteredVaults}
        refetchVaults={refetch}
      />
    </Container>
  );
}
