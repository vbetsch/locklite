import React from 'react';
import type { JSX } from 'react';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import { avatarSxStyle } from '@ui/styles/avatar.style';

type LetterAvatarProps = {
  userName: string | null;
};

const ACCESSIBLE_COLORS: string[] = [
  '#1976d2',
  '#388e3c',
  '#f57c00',
  '#7b1fa2',
  '#c2185b',
  '#00796b',
  '#5d4037',
  '#455a64',
  '#e64a19',
  '#303f9f',
  '#689f38',
  '#fbc02d',
];

export default function ColorfulLetterAvatar(
  props: LetterAvatarProps
): JSX.Element {
  if (!props.userName) {
    return (
      <Avatar sx={avatarSxStyle}>
        <AccountCircle
          sx={{
            width: '100%',
            height: '100%',
          }}
        />
      </Avatar>
    );
  }

  const stringToAccessibleColor = (string: string): string => {
    let hash: number = 0;

    for (let i: number = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colorIndex: number = Math.abs(hash) % ACCESSIBLE_COLORS.length;
    return ACCESSIBLE_COLORS[colorIndex];
  };

  const stringAvatar = (
    name: string
  ): { sx: SxProps<Theme>; children: string } => {
    const parts: string[] = name.trim().split(' ').filter(Boolean);

    let initials: string;
    if (parts.length === 1) {
      initials = parts[0][0].toUpperCase();
    } else {
      initials = `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    return {
      sx: {
        ...avatarSxStyle,
        bgcolor: stringToAccessibleColor(name),
        color: '#ffffff',
      },
      children: initials,
    };
  };

  return <Avatar {...stringAvatar(props.userName)} />;
}
