'use client';

import type { JSX } from 'react';
import React, { useState, useEffect } from 'react';
import type { SignInResponse } from 'next-auth/react';
import { signIn, useSession } from 'next-auth/react';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SessionStatus } from '@shared/modules/auth/session-status.enum';
import { RoutesEnum } from '@ui/routes.enum';
import CircularLoader from '@ui/components/loaders/CircularLoader';
import { Box } from '@mui/material';

export function SignInForm(): JSX.Element | null {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const { data: session, status } = useSession();
  const router: AppRouterInstance = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  const handleError = (): void => setError(new Error('Invalid credentials'));

  useEffect(() => {
    if (status === SessionStatus.AUTHENTICATED) {
      router.push(RoutesEnum.WORKSPACE);
    }
  }, [session, status, router]);

  useEffect(() => {
    const err: string | null = searchParams.get('error');
    if (err) handleError();
  }, [searchParams]);

  if (status === SessionStatus.LOADING) {
    return <CircularLoader loading />;
  }

  if (status === SessionStatus.AUTHENTICATED) {
    return null;
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setError(null);
    const res: SignInResponse | undefined = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: RoutesEnum.WORKSPACE,
    });
    if (res?.error) {
      handleError();
    } else {
      router.push(RoutesEnum.WORKSPACE);
    }
  }

  return (
    // eslint-disable-next-line no-restricted-syntax
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" width={500} gap={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            error={!!error}
            helperText={error ? error.message : null}
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            error={!!error}
            helperText={error ? error.message : null}
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Box>
        <Button
          type="submit"
          variant={'contained'}
          sx={{ width: 'fit-content' }}
        >
          Sign in
        </Button>
      </Box>
    </form>
  );
}
