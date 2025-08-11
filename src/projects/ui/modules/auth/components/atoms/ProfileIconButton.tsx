import React from 'react';
import type { JSX } from 'react';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LetterAvatar from '@ui/components/avatars/LetterAvatar';

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
      {props.userName ? (
        <LetterAvatar userName={props.userName} />
      ) : (
        <AccountCircle />
      )}
    </IconButton>
  );
}
