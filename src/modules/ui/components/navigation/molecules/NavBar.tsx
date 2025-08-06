'use client';

import React, { useState } from 'react';
import type { JSX } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ProfileMenu from '@ui/components/menus/organisms/ProfileMenu';

type NavBarProps = {
  title: string;
  authenticated: boolean;
};

export default function NavBar(props: NavBarProps): JSX.Element {
  const [anchorProfileMenuEl, setAnchorProfileMenuEl] =
    useState<null | HTMLElement>(null);

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorProfileMenuEl(event.currentTarget);
  };

  return (
    <AppBar position={'sticky'} component="header">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        <Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfileMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          {props.authenticated && (
            <ProfileMenu
              anchorEl={anchorProfileMenuEl}
              setAnchorEl={setAnchorProfileMenuEl}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
