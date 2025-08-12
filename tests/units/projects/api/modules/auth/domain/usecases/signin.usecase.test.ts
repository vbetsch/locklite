import 'reflect-metadata';
import type { SignInPayloadDto } from '@shared/modules/auth/dto/sign-in/sign-in.payload.dto';
import type { UsersRepository } from '@api/modules/users/infra/users.repository';
import type { HashService } from '@api/modules/auth/domain/hash.service';
import type { UserAdapter } from '@api/modules/users/app/user.adapter';
import type { User } from '@prisma/generated';
import type { UserModelDto } from '@shared/modules/users/user.model.dto';
import { SignInUseCase } from '@api/modules/auth/domain/usecases/signin.usecase';

describe('SignInUseCase', () => {
  let usersRepository: UsersRepository;
  let hashService: HashService;
  let userAdapter: UserAdapter;
  let useCase: SignInUseCase;

  let findByEmailMock: jest.MockedFunction<
    (email: string) => Promise<User | null>
  >;
  let compareMock: jest.MockedFunction<
    (hashedInput: string, refValue: string) => Promise<boolean>
  >;
  let getDtoFromEntityMock: jest.MockedFunction<(user: User) => UserModelDto>;

  beforeEach((): void => {
    findByEmailMock = jest.fn<(email: string) => Promise<User | null>>();
    compareMock =
      jest.fn<(hashedInput: string, refValue: string) => Promise<boolean>>();
    getDtoFromEntityMock = jest.fn<(user: User) => UserModelDto>();

    usersRepository = { findByEmail: findByEmailMock } as UsersRepository;
    hashService = {
      compare: compareMock,
      hash: jest.fn<(s: string) => Promise<string>>(),
    } as HashService;
    userAdapter = { getDtoFromEntity: getDtoFromEntityMock } as UserAdapter;

    useCase = new SignInUseCase(usersRepository, hashService, userAdapter);
  });

  it('returns null when input is null', async (): Promise<void> => {
    const input: SignInPayloadDto | null = null;

    const result: UserModelDto | null = await useCase.handle(input);

    expect(result).toBeNull();
    expect(findByEmailMock).not.toHaveBeenCalled();
    expect(compareMock).not.toHaveBeenCalled();
    expect(getDtoFromEntityMock).not.toHaveBeenCalled();
  });

  it('returns null when user is not found (TC-F2.1.B)', async (): Promise<void> => {
    const input: SignInPayloadDto = {
      email: 'foo@bar.tld',
      password: 'secret',
    };
    findByEmailMock.mockResolvedValue(null);

    const result: UserModelDto | null = await useCase.handle(input);

    expect(findByEmailMock).toHaveBeenCalledWith({ email: 'foo@bar.tld' });
    expect(compareMock).not.toHaveBeenCalled();
    expect(getDtoFromEntityMock).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('returns null when credentials are invalid (TC-F2.1.B)', async (): Promise<void> => {
    const input: SignInPayloadDto = {
      email: 'john@doe.tld',
      password: 'wrong',
    };
    const found: User = {
      id: 'u_1',
      email: 'john@doe.tld',
      password: 'hashed:123',
    } as unknown as User;

    findByEmailMock.mockResolvedValue(found);
    compareMock.mockResolvedValue(false);

    const result: UserModelDto | null = await useCase.handle(input);

    expect(findByEmailMock).toHaveBeenCalledWith({ email: 'john@doe.tld' });
    expect(compareMock).toHaveBeenCalledWith('wrong', 'hashed:123');
    expect(getDtoFromEntityMock).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('returns UserModelDto when credentials are valid (TC-F2.1.A)', async (): Promise<void> => {
    const input: SignInPayloadDto = {
      email: 'alice@acme.tld',
      password: 'p@ssw0rd',
    };
    const found: User = {
      id: 'u_42',
      email: 'alice@acme.tld',
      password: 'bcrypt$hash',
    } as unknown as User;

    const dto: UserModelDto = {
      id: 'u_42',
      email: 'alice@acme.tld',
    } as UserModelDto;

    findByEmailMock.mockResolvedValue(found);
    compareMock.mockResolvedValue(true);
    getDtoFromEntityMock.mockReturnValue(dto);

    const result: UserModelDto | null = await useCase.handle(input);

    expect(findByEmailMock).toHaveBeenCalledWith({ email: 'alice@acme.tld' });
    expect(compareMock).toHaveBeenCalledWith('p@ssw0rd', 'bcrypt$hash');
    expect(getDtoFromEntityMock).toHaveBeenCalledWith(found);
    expect(result).toEqual(dto);
  });

  it('propagates repository errors', async (): Promise<void> => {
    const input: SignInPayloadDto = { email: 'err@repo.tld', password: 'x' };
    const thrown: Error = new Error('repo failure');
    findByEmailMock.mockRejectedValue(thrown);

    await expect(useCase.handle(input)).rejects.toThrow(thrown);

    expect(compareMock).not.toHaveBeenCalled();
    expect(getDtoFromEntityMock).not.toHaveBeenCalled();
  });

  it('propagates hash service errors', async (): Promise<void> => {
    const input: SignInPayloadDto = { email: 'bob@acme.tld', password: 'x' };
    const found: User = {
      id: 'u_2',
      email: 'bob@acme.tld',
      password: 'hash',
    } as unknown as User;

    const thrown: Error = new Error('compare failure');

    findByEmailMock.mockResolvedValue(found);
    compareMock.mockRejectedValue(thrown);

    await expect(useCase.handle(input)).rejects.toThrow(thrown);

    expect(getDtoFromEntityMock).not.toHaveBeenCalled();
  });
});
