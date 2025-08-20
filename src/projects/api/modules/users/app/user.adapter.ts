import { injectable } from 'tsyringe';

@injectable()
export class UserAdapter implements IAdapter<User, UserModelDto> {
  public getDtoFromEntity(entity: User): UserModelDto {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name || undefined,
    };
  }

  public getDtoListFromEntities(entities: User[]): UserModelDto[] {
    return entities.map((entity: User) => this.getDtoFromEntity(entity));
  }
}
