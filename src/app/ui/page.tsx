import React from 'react';
import type { JSX } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function Home(): JSX.Element {
  return (
    <Box>
      <Typography>homepage</Typography>
      <Image
        src={'/img/typescript.png'}
        alt={'example'}
        height={200}
        width={200}
      />
    </Box>
  );
}
