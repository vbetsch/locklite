import React from 'react';
import type { JSX } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ProfileNavIcon from '@ui/components/navigation/atoms/ProfileNavIcon';

type NavBarProps = {
  title: string;
  authenticated: boolean;
};

export default function NavBar(props: NavBarProps): JSX.Element {
  return (
    <AppBar position={'sticky'} component="header">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        {props.authenticated && <ProfileNavIcon />}
      </Toolbar>
    </AppBar>
  );
}
