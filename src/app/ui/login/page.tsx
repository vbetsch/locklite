'use client';

import React, { Suspense } from 'react';
import type { JSX } from 'react';
import PageContainer from '@ui/components/templates/PageContainer';
import { SignInForm } from '@ui/modules/auth/components/organisms/SignInForm';
import CircularLoader from '@ui/components/loaders/CircularLoader';
import { Alert, Typography } from '@mui/material';

export default function SignInPage(): JSX.Element {
  return (
    <PageContainer title={'Login'}>
      <Alert variant="filled" severity="error">
        This application is{' '}
        <Typography component="span" fontWeight="bold">
          fictitious
        </Typography>
        . We strongly recommend that you do not enter your real login details.
      </Alert>
      <Suspense fallback={<CircularLoader loading />}>
        <SignInForm />
      </Suspense>
    </PageContainer>
  );
}
