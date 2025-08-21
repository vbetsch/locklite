import 'reflect-metadata';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { handlePrismaRequest } from '@api/infra/prisma/helpers/handle-prisma-request';
import prisma from '@lib/prisma';
import type { UserEmailRecord } from '@api/modules/users/infra/records/user-email.record';
import type { CreateUserRecord } from '@api/modules/users/infra/records/create-user.record';
import { UsersRepository } from '@api/modules/users/infra/users.repository';
import type { Prisma, PrismaClient, User } from '@prisma/client';
import type { DefaultArgs } from 'prisma/generated/runtime/library';

jest.mock('@api/infra/prisma/helpers/handle-prisma-request');
jest.mock('@lib/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      upsert: jest.fn(),
    },
  },
}));

const mockHandlePrismaRequest: jest.MockedFunction<typeof handlePrismaRequest> =
  jest.mocked(handlePrismaRequest);
const mockPrisma: jest.MockedObject<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
> = jest.mocked(prisma);

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    usersRepository = new UsersRepository();
  });

  describe('findByEmail', () => {
    it('should return user when found', async () => {
      const userEmailRecord: UserEmailRecord = { email: 'test@example.com' };
      const expectedUser: User = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockHandlePrismaRequest.mockResolvedValue(expectedUser);

      const result: User | null =
        await usersRepository.findByEmail(userEmailRecord);

      expect(result).toEqual(expectedUser);
      expect(mockHandlePrismaRequest).toHaveBeenCalledTimes(1);
      expect(mockHandlePrismaRequest).toHaveBeenCalledWith(
        expect.any(Function)
      );
    });

    it('should return null when user not found', async () => {
      const userEmailRecord: UserEmailRecord = {
        email: 'notfound@example.com',
      };

      mockHandlePrismaRequest.mockResolvedValue(null);

      const result: User | null =
        await usersRepository.findByEmail(userEmailRecord);

      expect(result).toBeNull();
      expect(mockHandlePrismaRequest).toHaveBeenCalledTimes(1);
      expect(mockHandlePrismaRequest).toHaveBeenCalledWith(
        expect.any(Function)
      );
    });

    it('should call prisma.user.findUnique with correct parameters', async () => {
      const userEmailRecord: UserEmailRecord = { email: 'test@example.com' };

      mockHandlePrismaRequest.mockImplementation(callback => callback());

      await usersRepository.findByEmail(userEmailRecord);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should handle errors through handlePrismaRequest', async () => {
      const userEmailRecord: UserEmailRecord = { email: 'test@example.com' };
      const error: Error = new Error('Database connection failed');

      mockHandlePrismaRequest.mockRejectedValue(error);

      await expect(
        usersRepository.findByEmail(userEmailRecord)
      ).rejects.toThrow(error);
      expect(mockHandlePrismaRequest).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create and return new user', async () => {
      const createUserRecord: CreateUserRecord = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'hashedpassword',
      };
      const expectedUser: User = {
        id: 2,
        email: 'newuser@example.com',
        name: 'New User',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockHandlePrismaRequest.mockResolvedValue(expectedUser);

      const result: User = await usersRepository.create(createUserRecord);

      expect(result).toEqual(expectedUser);
      expect(mockHandlePrismaRequest).toHaveBeenCalledTimes(1);
      expect(mockHandlePrismaRequest).toHaveBeenCalledWith(
        expect.any(Function)
      );
    });

    it('should call prisma.user.create with correct parameters', async () => {
      const createUserRecord: CreateUserRecord = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'hashedpassword',
      };

      mockHandlePrismaRequest.mockImplementation(callback => callback());

      await usersRepository.create(createUserRecord);

      expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: createUserRecord,
      });
    });

    it('should handle errors through handlePrismaRequest', async () => {
      const createUserRecord: CreateUserRecord = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'hashedpassword',
      };
      const error: Error = new Error('Unique constraint violation');

      mockHandlePrismaRequest.mockRejectedValue(error);

      await expect(usersRepository.create(createUserRecord)).rejects.toThrow(
        error
      );
      expect(mockHandlePrismaRequest).toHaveBeenCalledTimes(1);
    });
  });

  describe('createOrUpdate', () => {
    it('should create new user when user does not exist', async () => {
      const createUserRecord: CreateUserRecord = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'hashedpassword',
      };
      const expectedUser: User = {
        id: 3,
        email: 'newuser@example.com',
        name: 'New User',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.user.upsert.mockResolvedValue(expectedUser);

      const result: User =
        await usersRepository.createOrUpdate(createUserRecord);

      expect(result).toEqual(expectedUser);
      expect(mockPrisma.user.upsert).toHaveBeenCalledTimes(1);
      expect(mockPrisma.user.upsert).toHaveBeenCalledWith({
        where: { email: createUserRecord.email },
        update: {
          name: createUserRecord.name,
          password: createUserRecord.password,
        },
        create: {
          name: createUserRecord.name,
          email: createUserRecord.email,
          password: createUserRecord.password,
        },
      });
    });

    it('should update existing user when user exists', async () => {
      const createUserRecord: CreateUserRecord = {
        name: 'Updated User',
        email: 'existing@example.com',
        password: 'newhashedpassword',
      };
      const existingUser: User = {
        id: 1,
        email: 'existing@example.com',
        name: 'Old Name',
        password: 'oldhashedpassword',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      };
      const updatedUser: User = {
        ...existingUser,
        name: 'Updated User',
        password: 'newhashedpassword',
        updatedAt: new Date(),
      };

      mockPrisma.user.upsert.mockResolvedValue(updatedUser);

      const result: User =
        await usersRepository.createOrUpdate(createUserRecord);

      expect(result).toEqual(updatedUser);
      expect(mockPrisma.user.upsert).toHaveBeenCalledTimes(1);
    });

    it('should handle database errors', async () => {
      const createUserRecord: CreateUserRecord = {
        name: 'User',
        email: 'user@example.com',
        password: 'hashedpassword',
      };
      const error: Error = new Error('Database connection failed');

      mockPrisma.user.upsert.mockRejectedValue(error);

      await expect(
        usersRepository.createOrUpdate(createUserRecord)
      ).rejects.toThrow(error);
      expect(mockPrisma.user.upsert).toHaveBeenCalledTimes(1);
    });

    it('should call upsert with all required parameters', async () => {
      const createUserRecord: CreateUserRecord = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
      };

      mockPrisma.user.upsert.mockResolvedValue({} as User);

      await usersRepository.createOrUpdate(createUserRecord);

      expect(mockPrisma.user.upsert).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        update: {
          name: 'Test User',
          password: 'testpassword',
        },
        create: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'testpassword',
        },
      });
    });

    it('should not use handlePrismaRequest wrapper', async () => {
      const createUserRecord: CreateUserRecord = {
        name: 'User',
        email: 'user@example.com',
        password: 'hashedpassword',
      };

      mockPrisma.user.upsert.mockResolvedValue({} as User);

      await usersRepository.createOrUpdate(createUserRecord);

      expect(mockHandlePrismaRequest).not.toHaveBeenCalled();
    });
  });

  describe('dependency injection', () => {
    it('should be instantiable', () => {
      expect(usersRepository).toBeInstanceOf(UsersRepository);
    });

    it('should have all required methods', () => {
      expect(typeof usersRepository.findByEmail).toBe('function');
      expect(typeof usersRepository.create).toBe('function');
      expect(typeof usersRepository.createOrUpdate).toBe('function');
    });
  });
});
