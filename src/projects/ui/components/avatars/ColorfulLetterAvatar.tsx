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

// Extract from https://mui.com/material-ui/react-avatar/#letter-avatars
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

  const stringToColor = (string: string): string => {
    let hash: number = 0;

    for (let i: number = 0; i < string.length; i += 1) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color: string = '#';
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    for (let i: number = 0; i < 3; i += 1) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const value: number = (hash >> (i * 8)) & 0xff;
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
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
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  };

  return <Avatar {...stringAvatar(props.userName)} />;
}
