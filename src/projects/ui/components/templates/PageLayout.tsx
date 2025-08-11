'use client';

import React from 'react';
import type { JSX } from 'react';
import AuthNavBar from '@ui/modules/auth/components/organisms/AuthNavBar';
import { Container } from '@mui/material';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';

export default function PageLayout(props: SharedLayoutProps): JSX.Element {
  return (
    <>
      <AuthNavBar />
      <Container component="main">{props.children}</Container>
    </>
  );
}
