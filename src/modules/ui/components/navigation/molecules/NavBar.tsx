'use client';

import React, { useState } from 'react';
import type { JSX } from 'react';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

type NavBarProps = {
  title: string;
};

export default function NavBar(props: NavBarProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
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
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ mt: 1 }}
          >
            <MenuItem
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                py: 1.5,
                px: 2,
                pointerEvents: 'none',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                userName
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                userType
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ px: 2, py: 1.5 }}>
              <Typography variant="inherit">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
