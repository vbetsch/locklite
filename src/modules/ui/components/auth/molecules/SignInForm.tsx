'use client';

import type { JSX } from 'react';
import React, { useState, useEffect } from 'react';
import type { SignInResponse } from 'next-auth/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SessionStatus } from '@shared/auth/session-status.enum';
import { RoutesEnum } from '@ui/router/routes.enum';
import CircularLoader from '@ui/components/common/CircularLoader';
import { Box } from '@mui/material';

export function SignInForm(): JSX.Element | null {
  const { data: session, status } = useSession();
  const router: AppRouterInstance = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (status === SessionStatus.AUTHENTICATED) {
      router.push(RoutesEnum.WORKSPACE);
    }
  }, [session, status, router]);

  if (status === SessionStatus.LOADING) {
    return <CircularLoader loading={true} />;
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
      redirect: false,
    });
    if (res?.error) {
      setError(new Error('Invalid credentials'));
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
