import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/domain/usecases/abstract/usecase.with-input.interface';
import { SignInPayloadDto } from '@shared/dto/input/payloads/sign-in.payload.dto';
import { UserAdapter } from '@api/app/adapters/user.adapter';
import { UsersRepository } from '@api/infra/repositories/users.repository';
import { HashService } from '@api/domain/services/hash.service';
import { User } from '@prisma/generated';
import { UserModelDto } from '@shared/dto/models/user.model.dto';

@injectable()
export class SignInUseCase
  implements IUseCaseWithInput<SignInPayloadDto | null, UserModelDto | null>
{
  public constructor(
    @inject(UsersRepository)
    private readonly _usersRepository: UsersRepository,
    @inject(HashService)
    private readonly _hashService: HashService,
    @inject(UserAdapter)
    private readonly _userAdapter: UserAdapter
  ) {}

  public async handle(
    input: SignInPayloadDto | null
  ): Promise<UserModelDto | null> {
    if (!input) return null;

    const userFound: User | null = await this._usersRepository.findByEmail({
      email: input.email,
    });
    if (!userFound) return null;

    const credentialsAreValid: boolean = await this._hashService.compare(
      input.password,
      userFound.password
    );
    if (!credentialsAreValid) return null;

    return this._userAdapter.getDtoFromEntity(userFound);
  }
}
