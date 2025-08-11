export interface IAdapter<Entity, Dto> {
  getDtoFromEntity(entity: Entity): Dto;
  getDtoListFromEntities(entities: Entity[]): Dto[];
}
