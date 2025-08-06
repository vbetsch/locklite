'use client';

import React from 'react';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';
import type { JSX } from 'react';
import AuthGuard from '@ui/guards/AuthGuard';
import { SessionProvider } from 'next-auth/react';

export default function WorkspaceLayout(props: SharedLayoutProps): JSX.Element {
  return (
    <SessionProvider>
      <AuthGuard>{props.children}</AuthGuard>
    </SessionProvider>
  );
}
