import type { Metadata } from 'next';
import React, { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Hello World',
};

export default function HelloWorldLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <>{children}</>;
}
