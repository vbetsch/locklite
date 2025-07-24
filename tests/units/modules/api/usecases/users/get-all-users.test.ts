import 'reflect-metadata';

import type { UserRepository } from '@api/repositories/user.repository';
import type { UserAdapter } from '@api/adapters/user.adapter';
import type { MasterAccount } from '@prisma/generated';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import { UsersNotFoundError } from '@api/errors/users-not-found.error';
import { GetAllUsersUseCase } from '@api/usecases/users/get-all-users.usecase';

describe('GetAllUsersUseCase', () => {
  let _userRepository: jest.Mocked<UserRepository>;
  let _userAdapter: jest.Mocked<UserAdapter>;
  let useCase: GetAllUsersUseCase;

  beforeEach(() => {
    _userRepository = {
      getAll: jest.fn(),
    } as jest.Mocked<UserRepository>;

    _userAdapter = {
      getUsersFromMasterAccounts: jest.fn(),
    } as jest.Mocked<UserAdapter>;

    useCase = new GetAllUsersUseCase(_userRepository, _userAdapter);
  });

  it('should return the list of users when master accounts are found', async () => {
    const masterAccounts: MasterAccount[] = [
      { id: 1 } as unknown as MasterAccount,
    ];
    const userModels: UserModelDto[] = [{ id: 1 } as unknown as UserModelDto];

    _userRepository.getAll.mockResolvedValueOnce(masterAccounts);
    _userAdapter.getUsersFromMasterAccounts.mockReturnValueOnce(userModels);

    const result: UserModelDto[] = await useCase.handle();

    expect(result).toBe(userModels);
    expect(_userRepository.getAll).toHaveBeenCalledTimes(1);
    expect(_userAdapter.getUsersFromMasterAccounts).toHaveBeenCalledWith(
      masterAccounts
    );
  });

  it('should throw an error if no user is found', async () => {
    _userRepository.getAll.mockResolvedValueOnce([]);

    await expect(useCase.handle()).rejects.toThrow(UsersNotFoundError);
  });

  it('should throw an error if fetching fails', async () => {
    _userRepository.getAll.mockRejectedValueOnce(new Error('DB error'));

    await expect(useCase.handle()).rejects.toThrow(UsersNotFoundError);
  });
});
