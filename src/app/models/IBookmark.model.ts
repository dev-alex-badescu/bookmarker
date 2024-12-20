import { IBaseEntity } from './IBaseEntity.model';

export interface IBookmark extends IBaseEntity {
  name: string;
  url: string;
}
