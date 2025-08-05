import { inject, injectable } from 'tsyringe';
import { IUseCaseWithInput } from '@api/usecases/abstract/usecase.with-input.interface';
import type { RegisterPayloadDto } from '@shared/dto/input/payloads/register.payload.dto';
import { UserModelDto } from '@shared/dto/models/user.model.dto';
import { UserAdapter } from '@api/adapters/user.adapter';
import { UsersRepository } from '@api/repositories/users.repository';
import { User } from '@prisma/generated';
import { HashService } from '@api/services/hash.service';

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
  public async handle(input: RegisterPayloadDto): Promise<UserModelDto> {
    // if (!email || !password) {
    //   return NextResponse.json(
    //     { message: 'Email and password are required' },
    //     { status: StatusCodes.BAD_REQUEST }
    //   );
    // }

    // const exists: User | null = await prisma.user.findUnique({
    //   where: { email },
    // });
    // if (exists) {
    //   return NextResponse.json(
    //     { message: 'User already exists' },
    //     { status: StatusCodes.CONFLICT }
    //   );
    // }

    const inputHashed: RegisterPayloadDto = {
      ...input,
      password: await this._hashService.hash(input.password),
    };

    const user: User = await this._usersRepository.create(inputHashed);

    return this._userAdapter.getDtoFromEntity(user);
  }
}
