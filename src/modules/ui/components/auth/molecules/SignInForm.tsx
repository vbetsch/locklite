'use client';

import type { JSX } from 'react';
import React, { useState, useEffect } from 'react';
import type { SignInResponse } from 'next-auth/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SessionStatus } from '@shared/auth/session-status.enum';
import { RoutesEnum } from '@ui/router/routes.enum';

export function SignInForm(): JSX.Element | null {
  const { data: session, status } = useSession();
  const router: AppRouterInstance = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === SessionStatus.AUTHENTICATED) {
      router.push(RoutesEnum.WORKSPACE);
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  if (status === SessionStatus.LOADING) {
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
      setError(res.error);
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
      {error && <Typography>{error}</Typography>}
      <Button type="submit">Sign in</Button>
    </form>
  );
}
