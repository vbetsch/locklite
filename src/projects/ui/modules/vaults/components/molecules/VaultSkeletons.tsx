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
      {Array.from({ length: 9 }).map((_, i) => (
        <Grid key={i} size={1}>
          <Card sx={{ bgcolor: 'background.paper', padding: '0.5rem' }}>
            <CardHeader title={<Skeleton variant="text" width={'100%'} />} />
            <CardContent>
              <Skeleton variant="text" />
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingLeft: '1rem',
                paddingRight: '1rem',
              }}
            >
              <Skeleton variant="text" width={'30%'} />
              <Skeleton variant="text" width={'30%'} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
