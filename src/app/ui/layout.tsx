import type { Metadata } from 'next';
import type { JSX } from 'react';
import React from 'react';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';
import ClientProviders from '@ui/providers/ClientProviders';
import PageLayout from '@ui/components/templates/PageLayout';
import { CONSTANTS } from '@shared/config/constants';

export const metadata: Metadata = {
  title: {
    default: CONSTANTS.APP_NAME,
    template: `%s | ${CONSTANTS.APP_NAME}`,
  },
  description: CONSTANTS.APP_DESCRIPTION,
};

export default function UiLayout(props: SharedLayoutProps): JSX.Element {
  return (
    <ClientProviders>
      <PageLayout>{props.children}</PageLayout>
    </ClientProviders>
  );
}
