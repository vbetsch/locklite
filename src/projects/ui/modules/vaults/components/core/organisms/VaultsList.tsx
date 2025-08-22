import React, { useEffect } from 'react';
import type { JSX } from 'react';
import { Grid, Typography } from '@mui/material';
import VaultCard from '@ui/modules/vaults/components/core/molecules/VaultCard';
import VaultSkeletons from '@ui/modules/vaults/components/core/molecules/VaultSkeletons';
import { useUsers } from '@ui/modules/users/hooks/useUsers';
import { usersStore } from '@ui/modules/users/stores/users.store';
import type { VaultsStoreState } from '@ui/modules/vaults/stores/vaults.store';
import { vaultsStore } from '@ui/modules/vaults/stores/vaults.store';
import { useStore } from '@ui/stores/hooks/useStore';
import type { VaultWithMembersModelDto } from '@shared/modules/vaults/models/vault.with-members.model.dto';

type VaultsListProps = {
  loading: boolean;
  searchTerm: string;
};

export default function VaultsList(props: VaultsListProps): JSX.Element {
  const { users: allUsers, loading: usersLoading } = useUsers();
  const vaultsState: VaultsStoreState = useStore(vaultsStore);

  const filteredVaults: VaultWithMembersModelDto[] = vaultsState.vaults.filter(
    vault => vault.label.toLowerCase().includes(props.searchTerm.toLowerCase())
  );

  useEffect(() => {
    usersStore.setState({
      allUsers: allUsers,
    });
  }, [allUsers]);

  useEffect(() => {
    usersStore.setState({
      usersLoading: usersLoading,
    });
  }, [usersLoading]);

  if (props.loading) return <VaultSkeletons />;

  if (filteredVaults.length === 0)
    return (
      <Typography>
        {props.searchTerm ? 'No vaults match your search' : 'No results found'}
      </Typography>
    );

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3, lg: 3, xl: 4 }}
      columns={{ xs: 1, md: 2, lg: 3, xl: 3 }}
      alignContent={'start'}
      overflow={'auto'}
      height={'65vh'}
    >
      {filteredVaults.map(vault => (
        <Grid key={vault.id} size={1}>
          <VaultCard vault={vault} />
        </Grid>
      ))}
    </Grid>
  );
}
