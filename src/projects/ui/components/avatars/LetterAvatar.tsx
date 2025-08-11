import React from 'react';
import type { JSX } from 'react';
import Avatar from '@mui/material/Avatar';

type LetterAvatarProps = {
  profileName: string;
};

export default function LetterAvatar(props: LetterAvatarProps): JSX.Element {
  return <Avatar>{props.profileName[0]}</Avatar>;
}
