import UserItem from '@ui/components/users/atoms/UserItem';
import { UserModelDto } from '@shared/dto/models/user.model.dto';
import { JSX } from 'react';

type UsersListProps = {
  users: UserModelDto[];
};

export default function UsersList(props: UsersListProps): JSX.Element {
  return (
    <ul>
      {props.users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
