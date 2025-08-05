'use client';

import React from 'react';
import type { SignInResponse } from 'next-auth/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { JSX } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Form from 'next/form';
import { Typography } from '@mui/material';

export default function SignInPage(): JSX.Element | null {
  const { data: session } = useSession();
  const router: AppRouterInstance = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (session) {
    router.push('/');
    return null;
  }

  async function handleSubmit(): Promise<void> {
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
    <Form action={handleSubmit}>
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
    </Form>
  );
}
