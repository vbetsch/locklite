'use client';

import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Box, CircularProgress } from '@mui/material';
import type { JSX } from 'react';
import type { SharedChildrenProps } from '@shared/props/SharedChildrenProps';

export default function AuthGuard(props: SharedChildrenProps): JSX.Element {
  const { status } = useSession({
    required: true,
    async onUnauthenticated() {
      await signIn();
    },
  });
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  return <>{props.children}</>;
}
