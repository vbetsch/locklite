import React from 'react';
import type { JSX } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';
import VaultCard from '@ui/components/vaults/molecules/VaultCard';
import VaultSkeletons from '@ui/components/vaults/molecules/VaultSkeletons';

type VaultsListProps = {
  loading: boolean;
  displayedVaults: VaultModelDto[];
  searchTerm: string;
  refetchVaults: () => Promise<void>;
};

export default function VaultsList(props: VaultsListProps): JSX.Element {
  if (props.loading) return <VaultSkeletons />;

  if (props.displayedVaults.length === 0)
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
      {props.displayedVaults.map(vault => (
        <Grid key={vault.id} size={1}>
          <VaultCard vault={vault} refetchVaults={props.refetchVaults} />
        </Grid>
      ))}
    </Grid>
  );
}
