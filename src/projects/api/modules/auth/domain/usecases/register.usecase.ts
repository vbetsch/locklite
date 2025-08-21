import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/usecase.with-input.interface';
import { RegisterPayloadDto } from '@shared/modules/auth/dto/register/register.payload.dto';
import { UserModelDto } from '@shared/modules/users/user.model.dto';
import { UsersRepository } from '@api/modules/users/infra/users.repository';
import { HashService } from '@api/modules/auth/domain/hash.service';
import { UserAdapter } from '@api/modules/users/app/user.adapter';
import { UserAlreadyExistsError } from '@api/modules/users/app/errors/user-already-exists.error';
import { User } from '@prisma/client';

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
