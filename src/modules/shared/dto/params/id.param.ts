import type { NextParams } from '@shared/dto/params/abstract/next-params';

export type IdParam = NextParams<{
  id: string;
}>;
