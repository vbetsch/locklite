import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/abstract/usecase.with-input.interface';
import type { RegisterPayloadDto } from '@shared/modules/auth/dto/register/register.payload.dto';
import { UserModelDto } from '@shared/modules/users/user.model.dto';
import { UserAdapter } from '@api/app/adapters/user.adapter';
import { UsersRepository } from '@api/infra/repositories/users.repository';
import { User } from '@prisma/generated';
import { HashService } from '@api/domain/services/hash.service';
import { UserAlreadyExistsError } from '@api/domain/errors/auth/user-already-exists.error';

@injectable()
export class RegisterUseCase
  implements IUseCaseWithInput<RegisterPayloadDto, UserModelDto>
{
  public constructor(
    @inject(UsersRepository)
    private readonly _usersRepository: UsersRepository,
    @inject(HashService)
    private readonly _hashService: HashService,
    @inject(UserAdapter)
    private readonly _userAdapter: UserAdapter
  ) {}

  private async _testIfUserExists(email: string): Promise<void | never> {
    const userFound: User | null = await this._usersRepository.findByEmail({
      email,
    });
    if (userFound) {
      throw new UserAlreadyExistsError(email);
    }
  }

  private async _hashPasswordAndCreateUser(
    input: RegisterPayloadDto
  ): Promise<User> {
    const inputHashed: RegisterPayloadDto = {
      ...input,
      password: await this._hashService.hash(input.password),
    };
    return await this._usersRepository.create({ ...inputHashed });
  }

  public async handle(input: RegisterPayloadDto): Promise<UserModelDto> {
    await this._testIfUserExists(input.email);
    const user: User = await this._hashPasswordAndCreateUser(input);
    return this._userAdapter.getDtoFromEntity(user);
  }
}
