import React from 'react';
import type { JSX } from 'react';
import type { SharedLayoutProps } from '@shared/types/props/SharedLayoutProps';

export default function WorkspaceLayout(props: SharedLayoutProps): JSX.Element {
  return <>{props.children}</>;
}
