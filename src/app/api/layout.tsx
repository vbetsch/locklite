import type { JSX } from 'react';
import React from 'react';
import type { Metadata } from 'next';
import type { SharedLayoutProps } from '@shared/props/SharedLayoutProps';
import { CONSTANTS } from '@shared/config/constants';

export const metadata: Metadata = {
  title: `${CONSTANTS.APP_NAME} API`,
  description: `The API of the ${CONSTANTS.APP_NAME} password manager`,
};

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and user management
 *   - name: Vaults
 *     description: Manage password vault entries and encryption.
 *   - name: Users
 *     description: Manage and get information about users
 */

export default function RootLayout({
  children,
}: SharedLayoutProps): JSX.Element {
  return (
    // eslint-disable-next-line no-restricted-syntax
    <html lang="en">
      {/* eslint-disable-next-line no-restricted-syntax */}
      <body>{children}</body>
    </html>
  );
}
