import React from 'react';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import PageContainer from '@ui/components/common/PageContainer';
import { Typography } from '@mui/material';
import type { JSX } from 'react';

export default function AuthErrorPage(): JSX.Element {
  const params: ReadonlyURLSearchParams = useSearchParams();
  const error: string | null = params.get('error');
  return (
    <PageContainer title={'Authentication Error'}>
      <Typography>
        {error === 'CredentialsSignin'
          ? 'Invalid credentials.'
          : `Error : ${error}`}
      </Typography>
    </PageContainer>
  );
}
