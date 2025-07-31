import type { JSX } from 'react';
import React from 'react';
import { Container } from '@mui/material';
import type { SharedChildrenProps } from '@shared/types/props/SharedChildrenProps';

export default function PageContainer(props: SharedChildrenProps): JSX.Element {
  return (
    <Container
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {props.children}
    </Container>
  );
}
