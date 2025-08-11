import { container } from 'tsyringe';
import { useState } from 'react';
import { useApiFetch } from '@ui/hooks/useApiFetch';
import { MockUsersGateway } from '@ui/modules/users/gateways/mock.users.gateway';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import type { GetUsersListDataDto } from '@shared/dto/output/data/get-users-list.data.dto';

export function useUsers(): {
  users: UserModelDto[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const gateway: MockUsersGateway = container.resolve(MockUsersGateway);
  const [users, setUsers] = useState<UserModelDto[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { loading, refetch } = useApiFetch<GetUsersListDataDto>({
    request: () => gateway.getUsersList(),
    onSuccess: data => setUsers(data.allUsers),
    onError: err => setError(err),
  });

  return { users, loading, error, refetch };
}
