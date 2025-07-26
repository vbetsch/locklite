import React from 'react';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import type { JSX } from 'react';
import { ListItem, ListItemText } from '@mui/material';

type UserItemProps = {
  user: UserModelDto;
};

export default function UserItem(props: UserItemProps): JSX.Element {
  return (
    <ListItem>
      <ListItemText primary={props.user.email} />
    </ListItem>
  );
}
