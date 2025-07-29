export interface IAdapter<Model, Dto> {
  getDtoFromModel(model: Model): Dto;
}
