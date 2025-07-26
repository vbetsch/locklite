import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersList from '@ui/components/users/molecules/UsersList';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import type { ReactElement } from 'react';
import { ListItem, ListItemText } from '@mui/material';

jest.mock('@ui/components/users/atoms/UserItem', () => ({
  __esModule: true,
  default: ({ user }: { user: UserModelDto }): ReactElement => (
    <ListItem>
      <ListItemText primary={user.email} />
    </ListItem>
  ),
}));

describe('UsersList', () => {
  it('should render a list of users', () => {
    const users: UserModelDto[] = [
      { id: 1, email: 'Alice' } as unknown as UserModelDto,
      { id: 2, email: 'Bob' } as unknown as UserModelDto,
    ];

    render(<UsersList users={users} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('should render an empty list if no users are provided', () => {
    render(<UsersList users={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
