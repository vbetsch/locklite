import type { JSX } from 'react';
import React from 'react';
import { Container } from '@mui/material';

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer(props: PageContainerProps): JSX.Element {
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
