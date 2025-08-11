'use client';

import { Box } from '@mui/material';
import React, { useState } from 'react';
import type { JSX } from 'react';
import ProfileMenu from '@ui/modules/auth/components/atoms/ProfileMenu';
import ProfileIconButton from '@ui/modules/auth/components/atoms/ProfileIconButton';

export type ProfileNavItemProps = {
  currentUserName: string | null;
};

export default function ProfileNavItem(
  props: ProfileNavItemProps
): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <ProfileIconButton
        userName={props.currentUserName}
        handleClick={handleMenu}
      />
      <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </Box>
  );
}
