import React from 'react';
import type { JSX } from 'react';
import { CircularProgress } from '@mui/material';

type CircularLoaderProps = {
  loading: boolean;
};

export default function CircularLoader(
  props: CircularLoaderProps
): JSX.Element | null {
  if (!props.loading) return null;
  return <CircularProgress size="30px" />;
}
