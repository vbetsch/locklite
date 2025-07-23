import { UserModelDto } from '@shared/dto/models/user.model.dto';
import { JSX } from 'react';

type UserItemProps = {
  user: UserModelDto;
};

export default function UserItem(props: UserItemProps): JSX.Element {
  return <li>{props.user.email}</li>;
}
