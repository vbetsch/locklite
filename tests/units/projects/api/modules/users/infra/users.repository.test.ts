import 'reflect-metadata';
import { UsersRepository } from '@api/modules/users/infra/users.repository';
import { handlePrismaRequest } from '@api/infra/prisma/helpers/handle-prisma-request';
import prisma from '@lib/prisma';
import type { User } from '@prisma/client';
import type { UserEmailRecord } from '@api/modules/users/infra/records/user-email.record';
import type { CreateUserRecord } from '@api/modules/users/infra/records/create-user.record';

jest.mock('@api/infra/prisma/helpers/handle-prisma-request', () => ({
  handlePrismaRequest: jest.fn(),
}));

jest.mock('@lib/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      upsert: jest.fn(),
    },
  },
}));

describe('UsersRepository', () => {
  const repo: UsersRepository = new UsersRepository();

  const mockedHandlePrismaRequest: jest.MockedFunction<
    typeof handlePrismaRequest
  > = handlePrismaRequest as jest.MockedFunction<typeof handlePrismaRequest>;

  // eslint-disable-next-line @typescript-eslint/typedef
  const mockedPrisma = prisma as unknown as {
    user: {
      findMany: jest.Mock<Promise<User[]>, []>;
      findUnique: jest.Mock<Promise<User | null>, [unknown]>;
      create: jest.Mock<Promise<User>, [unknown]>;
      upsert: jest.Mock<Promise<User>, [unknown]>;
    };
  };

  const USER_ID: number = 1;
  const USER_EMAIL: string = 'john@doe.tld';
  const USER_NAME: string = 'John';
  const USER_PASSWORD: string = 'hashed';

  const makeUser = (overrides?: Partial<User>): User => {
    return {
      id: USER_ID.toString(),
      email: USER_EMAIL,
      name: USER_NAME,
      password: USER_PASSWORD,
      ...overrides,
    };
  };

  beforeEach((): void => {
    jest.clearAllMocks();
    mockedHandlePrismaRequest.mockImplementation(
      <T>(cb: () => Promise<T>): Promise<T> => cb()
    );
  });

  it('getAllUsers returns users and calls prisma.user.findMany', async (): Promise<void> => {
    const users: User[] = [makeUser(), makeUser({ id: '2', email: 'a@b.tld' })];
    mockedPrisma.user.findMany.mockResolvedValue(users);

    const result: User[] = await repo.getAllUsers();

    expect(mockedHandlePrismaRequest).toHaveBeenCalledTimes(1);
    expect(mockedPrisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual(users);
  });

  it('findByEmail returns a user when found and calls prisma.user.findUnique with where.email', async (): Promise<void> => {
    const user: User = makeUser();
    mockedPrisma.user.findUnique.mockResolvedValue(user);

    const record: UserEmailRecord = { email: USER_EMAIL };
    const result: User | null = await repo.findByEmail(record);

    expect(mockedHandlePrismaRequest).toHaveBeenCalledTimes(1);
    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: USER_EMAIL },
    });
    expect(result).toEqual(user);
  });

  it('findByEmail returns null when no user found', async (): Promise<void> => {
    mockedPrisma.user.findUnique.mockResolvedValue(null);

    const record: UserEmailRecord = { email: 'nobody@nowhere.tld' };
    const result: User | null = await repo.findByEmail(record);

    expect(mockedHandlePrismaRequest).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });

  it('create returns created user and calls prisma.user.create with data record', async (): Promise<void> => {
    const created: User = makeUser();
    mockedPrisma.user.create.mockResolvedValue(created);

    const record: CreateUserRecord = {
      name: USER_NAME,
      email: USER_EMAIL,
      password: USER_PASSWORD,
    };

    const result: User = await repo.create(record);

    expect(mockedHandlePrismaRequest).toHaveBeenCalledTimes(1);
    expect(mockedPrisma.user.create).toHaveBeenCalledWith({ data: record });
    expect(result).toEqual(created);
  });

  it('createOrUpdate returns user from upsert and calls prisma.user.upsert with correct where/update/create', async (): Promise<void> => {
    const upserted: User = makeUser({ name: 'Johnny' });
    mockedPrisma.user.upsert.mockResolvedValue(upserted);

    const record: CreateUserRecord = {
      name: USER_NAME,
      email: USER_EMAIL,
      password: USER_PASSWORD,
    };

    const result: User = await repo.createOrUpdate(record);

    expect(mockedHandlePrismaRequest).toHaveBeenCalledTimes(1);
    expect(mockedPrisma.user.upsert).toHaveBeenCalledWith({
      where: { email: USER_EMAIL },
      update: {
        name: USER_NAME,
        password: USER_PASSWORD,
      },
      create: {
        name: USER_NAME,
        email: USER_EMAIL,
        password: USER_PASSWORD,
      },
    });
    expect(result).toEqual(upserted);
  });

  it('propagates errors from handlePrismaRequest', async (): Promise<void> => {
    const boom: Error = new Error('boom');
    mockedHandlePrismaRequest.mockImplementation(
      <T>(_cb: () => Promise<T>): Promise<T> => {
        throw boom;
      }
    );

    await expect(repo.getAllUsers()).rejects.toBe(boom);

    expect(mockedHandlePrismaRequest).toHaveBeenCalledTimes(1);
    expect(mockedPrisma.user.findMany).not.toHaveBeenCalled();
  });
});
