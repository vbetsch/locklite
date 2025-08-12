'use client';

import 'reflect-metadata';
import React from 'react';
import type { JSX } from 'react';
import DynamicVaultsList from '@ui/modules/vaults/components/organisms/DynamicVaultsList';
import PageContainer from '@ui/components/templates/PageContainer';

export default function WorkspacePage(): JSX.Element {
  return (
    <PageContainer title={'Vaults'}>
      <DynamicVaultsList />
    </PageContainer>
  );
}
