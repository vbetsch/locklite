'use client';

import 'reflect-metadata';
import React from 'react';
import type { JSX } from 'react';
import DynamicVaultsList from '@ui/components/vaults/organisms/DynamicVaultsList';
import PageContainer from '@ui/components/common/PageContainer';

export default function WorkspacePage(): JSX.Element {
  return (
    <PageContainer title={'My vaults'}>
      <DynamicVaultsList />
    </PageContainer>
  );
}
