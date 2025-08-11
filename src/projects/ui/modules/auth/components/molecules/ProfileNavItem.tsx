'use client';

import { Box } from '@mui/material';
import React, { useState } from 'react';
import type { JSX } from 'react';
import ProfileMenu from '@ui/modules/auth/components/atoms/ProfileMenu';
import ProfileIconButton from '@ui/modules/auth/components/atoms/ProfileIconButton';

export default function ProfileNavItem(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      {/*TODO: Replace username by real current user name*/}
      <ProfileIconButton userName={'Hello World'} handleClick={handleMenu} />
      <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </Box>
  );
}
