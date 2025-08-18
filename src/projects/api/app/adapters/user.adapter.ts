import { injectable } from 'tsyringe';
import { IAdapter } from '@api/app/adapters/abstract/adapter.interface';
import { User } from '@prisma/client';
import { UserModelDto } from '@shared/dto/models/user.model.dto';

@injectable()
export class UserAdapter implements IAdapter<User, UserModelDto> {
  public getDtoFromEntity(entity: User): UserModelDto {
    return {
      id: entity.id,
      email: entity.email,
      // eslint-disable-next-line no-undefined
      name: entity.name || undefined,
    };
  }

  public getDtoListFromEntities(entities: User[]): UserModelDto[] {
    return entities.map((entity: User) => this.getDtoFromEntity(entity));
  }
}
