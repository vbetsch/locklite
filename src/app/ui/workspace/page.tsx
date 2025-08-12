'use client';

import 'reflect-metadata';
import React from 'react';
import type { JSX } from 'react';
import AppDynamicVaultsList from '@ui/modules/vaults/components/organisms/AppDynamicVaultsList';
import PageContainer from '@ui/components/templates/PageContainer';

export default function WorkspacePage(): JSX.Element {
  return (
    <PageContainer title={'Vaults'}>
      <AppDynamicVaultsList />
    </PageContainer>
  );
}
