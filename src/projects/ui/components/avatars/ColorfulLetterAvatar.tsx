import React from 'react';
import type { JSX } from 'react';
import Avatar from '@mui/material/Avatar';

type LetterAvatarProps = {
  userName: string;
};

export default function ColorfulLetterAvatar(
  props: LetterAvatarProps
): JSX.Element {
  const stringToColor = (string: string): string => {
    let hash: number = 0;
    let i: number;

    for (i = 0; i < string.length; i += 1) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color: string = '#';

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    for (i = 0; i < 3; i += 1) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const value: number = (hash >> (i * 8)) & 0xff;
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const stringAvatar = (
    name: string
  ): { sx: { bgcolor: string }; children: string } => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  };

  return <Avatar {...stringAvatar(props.userName)} />;
}
