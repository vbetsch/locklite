'use client';

import type { JSX } from 'react';
import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SessionStatus } from '@shared/auth/session-status.enum';
import { RoutesEnum } from '@ui/router/routes.enum';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularLoader from '@ui/components/common/CircularLoader';
import { Box } from '@mui/material';

export function SignUpForm(): JSX.Element | null {
  const { status } = useSession();
  const router: AppRouterInstance = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status === SessionStatus.AUTHENTICATED) {
      router.push(RoutesEnum.WORKSPACE);
    }
  }, [status, router]);

  if (status === SessionStatus.LOADING) {
    return <CircularLoader loading={true} />;
  }

  if (status === SessionStatus.AUTHENTICATED) {
    return null;
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError(new Error('Passwords do not match'));
      return;
    }
    setLoading(true);
    try {
      const res: Response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Unable to sign up');
      }
      await signIn('credentials', { email, password, redirect: false });
      router.push(RoutesEnum.WORKSPACE);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error('Unexpected error'));
    } finally {
      setLoading(false);
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
          <TextField
            error={!!error}
            helperText={error ? error.message : null}
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ width: 'fit-content' }}
        >
          {loading ? 'Signing up…' : 'Sign up'}
        </Button>
      </Box>
    </form>
  );
}
