import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Hello World',
};

export default function HelloWorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
