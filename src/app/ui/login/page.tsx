'use client';

import React, { Suspense } from 'react';
import type { JSX } from 'react';
import PageContainer from '@ui/components/templates/PageContainer';
import { SignInForm } from '@ui/modules/auth/components/organisms/SignInForm';
import CircularLoader from '@ui/components/loaders/CircularLoader';
import { Alert } from '@mui/material';

export default function SignInPage(): JSX.Element {
  return (
    <PageContainer title={'Login'}>
      <Alert variant="filled" severity="error">
        {/* eslint-disable-next-line no-restricted-syntax */}
        This application is <b>fictitious</b>. We strongly recommend that you do
        not enter your real login details.
      </Alert>
      <Suspense fallback={<CircularLoader loading />}>
        <SignInForm />
      </Suspense>
    </PageContainer>
  );
}
