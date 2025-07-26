import React from 'react';
import type { JSX } from 'react';
import { Typography } from '@mui/material';

type ErrorProps = {
  error: Error | null;
};

export default function ErrorMessage(props: ErrorProps): JSX.Element | null {
  if (!props.error) return null;
  console.error('Error: ', props.error);
  return (
    <Typography sx={{ color: 'red' }}>
      {props.error.message || 'Unknow error'}
    </Typography>
  );
}
