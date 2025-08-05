'use client';

import React from 'react';
import type { JSX } from 'react';
import PageContainer from '@ui/components/common/PageContainer';
import { SessionProvider } from 'next-auth/react';
import { SignInForm } from '@ui/components/auth/molecules/SignInForm';

export default function SignInPage(): JSX.Element {
  return (
    <PageContainer title={'Login'}>
      <SessionProvider>
        <SignInForm />
      </SessionProvider>
    </PageContainer>
  );
}
