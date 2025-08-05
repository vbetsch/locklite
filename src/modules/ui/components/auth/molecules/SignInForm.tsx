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
import ErrorMessage from '@ui/components/common/ErrorMessage';

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
    const res: SignInResponse | undefined = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError(new Error(res.error));
    } else {
      router.push('/');
    }
  }

  return (
    // eslint-disable-next-line no-restricted-syntax
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <ErrorMessage error={error} />}
      <Button type="submit">Sign in</Button>
    </form>
  );
}
