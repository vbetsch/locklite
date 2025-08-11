'use client';

import React from 'react';
import type { JSX } from 'react';
import MainNavBar from '@ui/components/navigation/organisms/MainNavBar';
import { Container } from '@mui/material';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';

export default function PageLayout(props: SharedLayoutProps): JSX.Element {
  return (
    <>
      <MainNavBar />
      <Container component="main">{props.children}</Container>
    </>
  );
}
