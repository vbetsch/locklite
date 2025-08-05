import { Box, Button } from '@mui/material';
import ErrorMessage from '@ui/components/common/ErrorMessage';
import SearchBar from '@ui/components/common/SearchBar';
import AddVaultModal from '@ui/components/vaults/organisms/AddVaultModal';
import React, { useState } from 'react';
import type { JSX } from 'react';
import VaultsList from './VaultsList';
import { useVaults } from '@ui/hooks/useVaults';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import AddIcon from '@mui/icons-material/Add';

export default function DynamicVaultsList(): JSX.Element {
  const { vaults, loading, error, refetch } = useVaults();
  const [openAddModal, setOpenAddModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredVaults: VaultModelDto[] = vaults.filter(v =>
    v.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AddVaultModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        refreshVaults={refetch}
      />
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
          onClick={() => setOpenAddModal(true)}
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
    </>
  );
}
