import { Box, Button, Typography } from '@mui/material';
import ErrorMessage from '@ui/components/errors/ErrorMessage';
import SearchBar from '@ui/components/navigation/SearchBar';
import AddVaultModal from '@ui/modules/vaults/components/modals/AddVaultModal';
import React, { useState } from 'react';
import type { JSX } from 'react';
import VaultsList from '../organisms/VaultsList';
import AddIcon from '@mui/icons-material/Add';
import { useVaultsWithMembers } from '@ui/modules/vaults/hooks/useVaults.withMembers';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/vault.with-members.model.dto';

export default function AppDynamicVaultsList(): JSX.Element {
  // TODO: use useVaults
  const { vaults, loading, error, refetch } = useVaultsWithMembers();
  const [openAddVaultModal, setOpenAddVaultModal] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState('');
  // TODO: use VaultModelDto
  const filteredVaults: VaultWithMembersModelDto[] = vaults.filter(v =>
    v.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AddVaultModal
        open={openAddVaultModal}
        onClose={() => setOpenAddVaultModal(false)}
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
          sx={{
            minWidth: { xs: 56, sm: 150 },
            '& .MuiButton-startIcon': {
              mr: { xs: 0, sm: 1 },
            },
          }}
          onClick={() => setOpenAddVaultModal(true)}
        >
          <Typography
            variant={'button'}
            sx={{
              display: { xs: 'none', sm: 'inline' },
            }}
          >
            Add a vault
          </Typography>
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
