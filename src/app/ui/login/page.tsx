'use client';

import React from 'react';
import type { JSX } from 'react';
import PageContainer from '@ui/components/templates/PageContainer';
import { SignInForm } from '@ui/components/auth/molecules/SignInForm';

export default function SignInPage(): JSX.Element {
  return (
    <PageContainer title={'Login'}>
      <SignInForm />
    </PageContainer>
  );
}
