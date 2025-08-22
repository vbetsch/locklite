import { Box } from '@mui/material';
import ErrorMessage from '@ui/components/errors/ErrorMessage';
import SearchBar from '@ui/components/navigation/SearchBar';
import AddVaultModal from '@ui/modules/vaults/components/modals/AddVaultModal';
import React, { useEffect, useState } from 'react';
import type { JSX } from 'react';
import VaultsList from '@ui/modules/vaults/components/core/organisms/VaultsList';
import AddIcon from '@mui/icons-material/Add';
import { useVaultsWithMembers } from '@ui/modules/vaults/hooks/useVaults.withMembers';
import IconTextButton from '@ui/components/buttons/IconTextButton';
import { vaultsStore } from '@ui/modules/vaults/stores/vaults.store';

export default function AppDynamicVaultsList(): JSX.Element {
  const { vaults: initialVaults, loading, error } = useVaultsWithMembers();
  const [openAddVaultModal, setOpenAddVaultModal] = useState<boolean>(false);

  useEffect(() => {
    vaultsStore.setState({ vaults: [...initialVaults] });
  }, [initialVaults]);

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <AddVaultModal
        open={openAddVaultModal}
        onClose={() => setOpenAddVaultModal(false)}
      />
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          width: '100%',
        }}
      >
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <IconTextButton
          icon={<AddIcon />}
          text={'Add a vault'}
          onClick={() => setOpenAddVaultModal(true)}
        />
      </Box>
      <ErrorMessage error={error} />
      <VaultsList loading={loading} searchTerm={searchTerm} />
    </>
  );
}
