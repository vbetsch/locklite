'use client';

import React from 'react';
import type { JSX } from 'react';
import PageContainer from '@ui/components/common/PageContainer';
import { SessionProvider } from 'next-auth/react';
import { SignUpForm } from '@ui/components/auth/molecules/SignUpForm';

export default function SignUpPage(): JSX.Element {
  return (
    <PageContainer title={'Register'}>
      <SessionProvider>
        <SignUpForm />
      </SessionProvider>
    </PageContainer>
  );
}
