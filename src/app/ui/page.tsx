import type { JSX } from 'react';
import { redirect } from 'next/navigation';

export default function HomePage(): JSX.Element {
  redirect('/ui/workspace');
}
