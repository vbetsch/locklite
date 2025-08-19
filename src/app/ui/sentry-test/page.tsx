'use client';

import React from 'react';
import * as Sentry from '@sentry/nextjs';
import { Button, Stack, Typography, Container, Paper } from '@mui/material';
import type { JSX } from 'react';

export default function SentryTestPage(): JSX.Element {
  const throwClientError = (): never => {
    throw new Error('Client error: synthetic crash');
  };

  const unhandledRejection = (): void => {
    Promise.reject(new Error('Client unhandled rejection'));
  };

  const captureMessage = (): void => {
    Sentry.captureMessage('Client info: user clicked captureMessage');
  };

  const callServerError = async (): Promise<void> => {
    await fetch('/api/boom');
  };

  const callSlowApi = async (): Promise<void> => {
    await fetch('/api/slow');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Sentry Test Console</Typography>
          <Button variant="contained" onClick={throwClientError}>
            Throw client error
          </Button>
          <Button variant="contained" onClick={unhandledRejection}>
            Trigger unhandled rejection
          </Button>
          <Button variant="contained" onClick={captureMessage}>
            captureMessage()
          </Button>
          <Button variant="outlined" onClick={callServerError}>
            Call /api/boom (server error)
          </Button>
          <Button variant="outlined" onClick={callSlowApi}>
            Call /api/slow (slow transaction)
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
