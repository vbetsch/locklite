import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import type { JSX } from 'react';

type UserItemProps = {
  user: UserModelDto;
};

export default function UserItem(props: UserItemProps): JSX.Element {
  return <li>{props.user.email}</li>;
}
