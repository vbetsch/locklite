import React from 'react';
import type { JSX } from 'react';
import { Typography } from '@mui/material';
import { UiLogger } from '@ui/logs/ui.logger';

type ErrorProps = {
  error: Error | null;
};

export default function ErrorMessage(props: ErrorProps): JSX.Element | null {
  if (!props.error) return null;
  UiLogger.error(props.error.toString());
  return (
    <Typography sx={{ color: 'red' }}>
      Error: {props.error.message || 'Unknown error'}
    </Typography>
  );
}
