import type { JSX } from 'react';
import React from 'react';
import { Container, Typography } from '@mui/material';
import type { SharedChildrenProps } from '@shared/props/SharedChildrenProps';

type PageContainerProps = {
  title: string;
} & SharedChildrenProps;

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
      <Container
        sx={{
          paddingTop: '2rem',
          paddingInline: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        }}
      >
        <Typography variant={'h3'} textAlign={'left'}>
          {props.title}
        </Typography>
        {props.children}
      </Container>
    </Container>
  );
}
