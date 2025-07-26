'use client';
import 'reflect-metadata';
import React from 'react';
import type { JSX } from 'react';
import { useState } from 'react';
import UsersList from '@ui/components/users/molecules/UsersList';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import { UserGateway } from '@ui/gateways/user.gateway';
import type { GetAllUsersResponseDto } from '@shared/dto/responses/get-all-users.response.dto';
import { useApi } from '@ui/hooks/useApi';
import { container } from 'tsyringe';
import ErrorMessage from '@ui/components/common/ErrorMessage';
import CircularLoader from '@ui/components/common/CircularLoader';
import { Box, Typography } from '@mui/material';

export default function HelloWorldPage(): JSX.Element {
  const [users, setUsers] = useState<UserModelDto[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const userGateway: UserGateway = container.resolve(UserGateway);

  const { loading } = useApi<GetAllUsersResponseDto>({
    request: () => userGateway.getAll(),
    onSuccess: (data) => setUsers(data.users),
    onError: (err) => setError(err),
    deps: [],
  });

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant={'h3'}>Hello world!</Typography>
      <Typography>Here we display the list of users: </Typography>
      <ErrorMessage error={error} />
      <CircularLoader loading={loading} />
      <UsersList users={users} />
    </Box>
  );
}
