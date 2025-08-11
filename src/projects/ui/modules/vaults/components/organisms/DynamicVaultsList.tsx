import { Box, Button } from '@mui/material';
import ErrorMessage from '@ui/components/errors/ErrorMessage';
import SearchBar from '@ui/components/navigation/SearchBar';
import AddVaultModal from '@ui/modules/vaults/components/organisms/AddVaultModal';
import React, { useState } from 'react';
import type { JSX } from 'react';
import VaultsList from './VaultsList';
import AddIcon from '@mui/icons-material/Add';
import { useVaultsWithMembers } from '@ui/modules/vaults/hooks/useVaults.withMembers';
import type { VaultWithMembersModelDto } from '@shared/dto/models/vault.with-members.model.dto';

export default function DynamicVaultsList(): JSX.Element {
  // TODO: use useVaults
  const { vaults, loading, error, refetch } = useVaultsWithMembers();
  const [openAddModal, setOpenAddModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  // TODO: use VaultModelDto
  const filteredVaults: VaultWithMembersModelDto[] = vaults.filter(v =>
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
