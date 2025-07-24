import type { Metadata } from 'next';
import type { JSX } from 'react';
import React from 'react';

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
