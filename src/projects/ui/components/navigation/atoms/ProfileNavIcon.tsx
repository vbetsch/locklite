'use client';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import type { JSX } from 'react';
import ProfileMenu from '@ui/components/menus/organisms/ProfileMenu';

export default function ProfileNavIcon(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
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
      <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </Box>
  );
}
