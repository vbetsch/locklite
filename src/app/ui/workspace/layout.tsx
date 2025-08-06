import React from 'react';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';
import type { JSX } from 'react';
import AuthGuard from '@ui/guards/AuthGuard';

export default function WorkspaceLayout(props: SharedLayoutProps): JSX.Element {
  return <AuthGuard>{props.children}</AuthGuard>;
}
