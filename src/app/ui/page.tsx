import type { JSX } from 'react';
import { redirect } from 'next/navigation';
import { RoutesEnum } from '@ui/routes.enum';

export default function HomePage(): JSX.Element {
  redirect(RoutesEnum.LOGIN);
}
