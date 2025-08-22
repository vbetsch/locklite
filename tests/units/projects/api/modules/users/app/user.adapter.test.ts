import 'reflect-metadata';
import { container } from 'tsyringe';
import type { User } from '@prisma/generated';
import type { UserModelDto } from '@shared/modules/users/user.model.dto';
import { UserAdapter } from '@api/modules/users/app/user.adapter';

describe('UserAdapter', (): void => {
  let userAdapter: UserAdapter;

  beforeEach((): void => {
    container.reset();
    userAdapter = container.resolve(UserAdapter);
  });

  describe('getDtoFromEntity', (): void => {
    it('should convert a user entity with name to UserModelDto', (): void => {
      const mockUser: User = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      const result: UserModelDto = userAdapter.getDtoFromEntity(mockUser);

      expect(result).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        name: 'John Doe',
      });
    });

    it('should convert a user entity without name to UserModelDto with undefined name', (): void => {
      const mockUser: User = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        email: 'test2@example.com',
        name: null,
        password: 'hashedPassword456',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      const result: UserModelDto = userAdapter.getDtoFromEntity(mockUser);

      expect(result).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174001',
        email: 'test2@example.com',
        name: undefined,
      });
    });
  });

  describe('getDtoListFromEntities', (): void => {
    it('should convert an array of user entities to array of UserModelDto', (): void => {
      const mockUsers: User[] = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'user1@example.com',
          name: 'User One',
          password: 'hashedPassword1',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          email: 'user2@example.com',
          name: null,
          password: 'hashedPassword2',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174002',
          email: 'user3@example.com',
          name: 'User Three',
          password: 'hashedPassword3',
          createdAt: new Date('2024-01-03'),
          updatedAt: new Date('2024-01-03'),
        },
      ];

      const result: UserModelDto[] =
        userAdapter.getDtoListFromEntities(mockUsers);

      expect(result).toEqual([
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'user1@example.com',
          name: 'User One',
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          email: 'user2@example.com',
          name: undefined,
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174002',
          email: 'user3@example.com',
          name: 'User Three',
        },
      ]);
    });

    it('should return an empty array when given an empty array', (): void => {
      const mockUsers: User[] = [];

      const result: UserModelDto[] =
        userAdapter.getDtoListFromEntities(mockUsers);

      expect(result).toEqual([]);
    });

    it('should handle a single user in the array', (): void => {
      const mockUsers: User[] = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'single@example.com',
          name: 'Single User',
          password: 'hashedPassword',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      const result: UserModelDto[] =
        userAdapter.getDtoListFromEntities(mockUsers);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'single@example.com',
        name: 'Single User',
      });
    });
  });

  describe('Injectable decorator', (): void => {
    it('should be injectable through tsyringe container', (): void => {
      const instance: UserAdapter = container.resolve(UserAdapter);

      expect(instance).toBeInstanceOf(UserAdapter);
    });

    it('should create a new instance each time when not registered as singleton', (): void => {
      const instance1: UserAdapter = container.resolve(UserAdapter);
      const instance2: UserAdapter = container.resolve(UserAdapter);

      expect(instance1).not.toBe(instance2);
    });
  });
});
