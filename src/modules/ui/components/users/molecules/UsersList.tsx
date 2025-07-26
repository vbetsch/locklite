import React from 'react';
import UserItem from '@ui/components/users/atoms/UserItem';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import type { JSX } from 'react';
import { List } from '@mui/material';

type UsersListProps = {
  users: UserModelDto[];
};

export default function UsersList(props: UsersListProps): JSX.Element {
  return (
    <List>
      {props.users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </List>
  );
}
