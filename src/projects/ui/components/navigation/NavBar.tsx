import React from 'react';
import type { JSX } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import type { SharedChildrenProps } from '@shared/props/SharedChildrenProps';

type NavBarProps = {
  title: string;
} & SharedChildrenProps;

export default function NavBar(props: NavBarProps): JSX.Element {
  return (
    <AppBar position={'sticky'} component="header">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        {props.children}
      </Toolbar>
    </AppBar>
  );
}
