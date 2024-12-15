import { createEntityAdapter } from '@ngrx/entity';
import { BookmarkState } from '../shared/models/bookmark-state.model';
import { IBookmark } from '../../models/IBookmark.model';

export const bookmarkAdapter = createEntityAdapter<IBookmark>();

export const initialState: BookmarkState = bookmarkAdapter.getInitialState({
  loading: false,
});
