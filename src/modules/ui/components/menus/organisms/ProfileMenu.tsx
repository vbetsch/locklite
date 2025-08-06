import React from 'react';
import type { JSX } from 'react';
import { Divider, Menu, MenuItem, Typography } from '@mui/material';

type ProfileMenuProps = {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export default function ProfileMenu(props: ProfileMenuProps): JSX.Element {
  const handleClose = (): void => {
    props.setAnchorEl(null);
  };

  const handleLogout = (): void => {
    console.debug('Logout');
    handleClose();
  };

  return (
    <Menu
      id="menu-appbar"
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(props.anchorEl)}
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
        <Typography variant="inherit" onClick={handleLogout}>
          Logout
        </Typography>
      </MenuItem>
    </Menu>
  );
}
