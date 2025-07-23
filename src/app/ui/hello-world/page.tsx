'use client';
import styles from './page.module.css';
import { JSX, useState } from 'react';
import Title from '@ui/components/common/atoms/Title';
import UsersList from '@ui/components/users/molecules/UsersList';
import Loader from '@ui/components/common/atoms/Loader';
import { UserModelDto } from '@shared/dto/models/user.model.dto';
import { UserGateway } from '@ui/gateways/user.gateway';
import { GetAllUsersResponseDto } from '@shared/dto/responses/get-all-users.response.dto';
import { useApi } from '@ui/hooks/useApi';
import { container } from 'tsyringe';

export default function HelloWorldPage(): JSX.Element {
  const [users, setUsers] = useState<UserModelDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const userGateway: UserGateway = container.resolve(UserGateway);

  const { loading } = useApi<GetAllUsersResponseDto>({
    request: () => userGateway.getAll(),
    onSuccess: (data) => setUsers(data.users),
    onError: (err) => setError(err.message),
    deps: [], // put params here
  });

  return (
    <div className={styles.container}>
      <Title label="Hello world!" />
      <p>Here we display the list of users: </p>
      {loading && <Loader />}
      {error && <span className="error">{error}</span>}
      <UsersList users={users} />
    </div>
  );
}
