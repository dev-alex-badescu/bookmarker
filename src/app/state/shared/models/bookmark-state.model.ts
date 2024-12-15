import { IBookmark } from '../../../models/IBookmark.model';
import { EntityState } from '@ngrx/entity';
import { BaseState } from './base-state.model';

export interface BookmarkState extends BaseState, EntityState<IBookmark> {}
