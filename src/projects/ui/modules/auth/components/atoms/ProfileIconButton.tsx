import React from 'react';
import type { JSX } from 'react';
import { IconButton } from '@mui/material';
import ColorfulLetterAvatar from '@ui/components/avatars/ColorfulLetterAvatar';

type ProfileIconProps = {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  userName: string | null;
};

export default function ProfileIconButton(
  props: ProfileIconProps
): JSX.Element {
  return (
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={props.handleClick}
      color="inherit"
    >
      <ColorfulLetterAvatar userName={props.userName} />
    </IconButton>
  );
}
