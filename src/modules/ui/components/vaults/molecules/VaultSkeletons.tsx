import React from 'react';
import type { JSX } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
} from '@mui/material';

export default function VaultSkeletons(): JSX.Element {
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
}
