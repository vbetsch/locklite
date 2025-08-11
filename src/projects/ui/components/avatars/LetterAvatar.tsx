import React from 'react';
import type { JSX } from 'react';
import Avatar from '@mui/material/Avatar';

type LetterAvatarProps = {
  userName: string;
};

export default function LetterAvatar(props: LetterAvatarProps): JSX.Element {
  return <Avatar>{props.userName[0]}</Avatar>;
}
