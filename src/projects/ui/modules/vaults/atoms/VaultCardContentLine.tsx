import React from 'react';
import type { JSX } from 'react';
import { Box, Typography } from '@mui/material';

type VaultCardContentLineProps = {
  property: string;
  value: string;
};

export default function VaultCardContentLine(
  props: VaultCardContentLineProps
): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {props.property}:
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        fontFamily={'monospace'}
        overflow={'scroll'}
        textOverflow={'ellipsis'}
      >
        {props.value}
      </Typography>
    </Box>
  );
}
