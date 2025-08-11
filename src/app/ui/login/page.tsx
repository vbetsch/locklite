'use client';

import React, { Suspense } from 'react';
import type { JSX } from 'react';
import PageContainer from '@ui/components/templates/PageContainer';
import { SignInForm } from '@ui/modules/auth/molecules/SignInForm';
import CircularLoader from '@ui/components/common/CircularLoader';

export default function SignInPage(): JSX.Element {
  return (
    <PageContainer title={'Login'}>
      <Suspense fallback={<CircularLoader loading />}>
        <SignInForm />
      </Suspense>
    </PageContainer>
  );
}
