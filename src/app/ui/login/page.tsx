'use client';

import React, { Suspense } from 'react';
import type { JSX } from 'react';
import PageContainer from '@ui/components/templates/PageContainer';
import { SignInForm } from '@ui/modules/auth/components/organisms/SignInForm';
import CircularLoader from '@ui/components/loaders/CircularLoader';

export default function SignInPage(): JSX.Element {
  return (
    <PageContainer title={'Login'}>
      <Suspense fallback={<CircularLoader loading />}>
        <SignInForm />
      </Suspense>
    </PageContainer>
  );
}
