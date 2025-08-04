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

type VaultsListProps = {
  loading: boolean;
  displayedVaults: VaultModelDto[];
  searchTerm: string;
  deleteVault: (vault: VaultModelDto) => void;
};

export default function VaultsList(props: VaultsListProps): JSX.Element {
  if (props.loading)
    return (
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 3, xl: 4 }}
        columns={{ xs: 1, md: 2, lg: 3, xl: 3 }}
        alignContent={'start'}
        overflow={'auto'}
        height={'65vh'}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} size={1}>
            <Card sx={{ bgcolor: 'background.paper' }}>
              <CardHeader title={<Skeleton variant="text" width="80%" />} />
              <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </CardContent>
              <CardActions />
            </Card>
          </Grid>
        ))}
      </Grid>
    );

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
          <VaultCard vault={vault} deleteVault={props.deleteVault} />
        </Grid>
      ))}
    </Grid>
  );
}
