'use client';

import type { JSX } from 'react';
import React from 'react';
import ThemeRegistry from '@ui/providers/ThemeRegistry';
import { SessionProvider } from 'next-auth/react';

type ClientProvidersProps = {
  children: React.ReactNode;
};

export default function ClientProviders(
  props: ClientProvidersProps
): JSX.Element {
  return (
    <ThemeRegistry>
      <SessionProvider>{props.children}</SessionProvider>
    </ThemeRegistry>
  );
}
