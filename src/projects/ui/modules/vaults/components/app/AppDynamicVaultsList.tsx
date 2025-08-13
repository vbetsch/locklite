import { Box, Button, Typography } from '@mui/material';
import ErrorMessage from '@ui/components/errors/ErrorMessage';
import SearchBar from '@ui/components/navigation/SearchBar';
import AddVaultModal from '@ui/modules/vaults/components/modals/AddVaultModal';
import React, { useEffect, useState } from 'react';
import type { JSX } from 'react';
import VaultsList from '../organisms/VaultsList';
import AddIcon from '@mui/icons-material/Add';
import { useVaultsWithMembers } from '@ui/modules/vaults/hooks/useVaults.withMembers';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';

export default function AppDynamicVaultsList(): JSX.Element {
  const { vaults: initialVaults, loading, error } = useVaultsWithMembers();
  const [openAddVaultModal, setOpenAddVaultModal] = useState<boolean>(false);
  const [localVaults, setLocalVaults] = useState<VaultWithMembersModelDto[]>(
    []
  );

  useEffect(() => {
    setLocalVaults(initialVaults);
  }, [initialVaults]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredVaults: VaultWithMembersModelDto[] = localVaults.filter(v =>
    v.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addVault = (vaultCreated: VaultWithMembersModelDto): void => {
    setLocalVaults(prevVaults => [...prevVaults, vaultCreated]);
  };

  const editVault = (editedVault: VaultWithMembersModelDto): void => {
    setLocalVaults(prevVaults =>
      prevVaults.map(vault =>
        vault.id === editedVault.id ? editedVault : vault
      )
    );
  };

  const deleteVault = (deletedVault: VaultWithMembersModelDto): void => {
    setLocalVaults(prevVaults =>
      prevVaults.filter(vault => vault.id !== deletedVault.id)
    );
  };

  return (
    <>
      <AddVaultModal
        open={openAddVaultModal}
        onClose={() => setOpenAddVaultModal(false)}
        addVault={addVault}
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
        editVault={editVault}
        deleteVault={deleteVault}
      />
    </>
  );
}
