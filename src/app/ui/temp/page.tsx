'use client';

import 'reflect-metadata';
import React from 'react';
import type { JSX } from 'react';
import { useUsers } from '@ui/modules/users/hooks/useUsers';
import CircularLoader from '@ui/components/loaders/CircularLoader';
import ErrorMessage from '@ui/components/errors/ErrorMessage';

// TODO: remove this page
export default function TempPage(): JSX.Element {
  const { users, loading, error } = useUsers();
  return (
    // eslint-disable-next-line no-restricted-syntax
    <ul>
      <CircularLoader loading={loading} />
      <ErrorMessage error={error} />
      {users.map(user => (
        // eslint-disable-next-line no-restricted-syntax
        <li key={user.id}>
          {/* eslint-disable-next-line no-restricted-syntax */}
          <span>{user.id}</span>
          {/* eslint-disable-next-line no-restricted-syntax */}
          <span>{user.name}</span>
          {/* eslint-disable-next-line no-restricted-syntax */}
          <span>{user.email}</span>
        </li>
      ))}
    </ul>
  );
}
