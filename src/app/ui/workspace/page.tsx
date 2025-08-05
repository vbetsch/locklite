'use client';

import 'reflect-metadata';
import React from 'react';
import type { JSX } from 'react';
import DynamicVaultsList from '@ui/components/vaults/templates/DynamicVaultsList';
import { Container, Typography } from '@mui/material';

export default function WorkspacePage(): JSX.Element {
  return (
    <Container
      sx={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      <Typography variant={'h3'} textAlign={'left'}>
        My vaults
      </Typography>
      <DynamicVaultsList />
    </Container>
  );
}
