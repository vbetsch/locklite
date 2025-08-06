import React from 'react';
import type { JSX } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

type MainNavBarProps = {
  title: string;
};

export default function MainNavBar(props: MainNavBarProps): JSX.Element {
  return (
    <AppBar position={'sticky'} component="header">
      <Toolbar>
        <Typography variant="h6">{props.title}</Typography>
      </Toolbar>
    </AppBar>
  );
}
