import { createAction, props } from '@ngrx/store';
import {
  CREATE_BOOKMARK_ACTION,
  CREATE_BOOKMARK_SUCCESS_ACTION,
  LOAD_BOOKMARK_ACTION,
  LOAD_BOOKMARK_FAIL_ACTION,
  LOAD_BOOKMARK_SUCCESS_ACTION,
  UPDATE_BOOKMARK_ACTION,
  UPDATE_BOOKMARK_FAIL_ACTION,
  UPDATE_BOOKMARK_SUCCESS_ACTION,
} from '../shared/consts/bookmark-store-actions.consts';
import { Update } from '@ngrx/entity';
import { IBookmark } from '../../models/IBookmark.model';

export const loadBookmarks = createAction(LOAD_BOOKMARK_ACTION);

export const loadBookmarksSuccess = createAction(
  LOAD_BOOKMARK_SUCCESS_ACTION,
  props<{ bookmarks: IBookmark[] }>()
);

export const loadBookmarksFail = createAction(
  LOAD_BOOKMARK_FAIL_ACTION,
  props<{ error: string | null }>()
);

export const createBookmark = createAction(
  CREATE_BOOKMARK_ACTION,
  props<{ bookmark: IBookmark }>()
);

export const createBookmarkSuccess = createAction(
  CREATE_BOOKMARK_SUCCESS_ACTION,
  props<{ bookmark: IBookmark }>()
);

export const createBookmarkFail = createAction(
  CREATE_BOOKMARK_ACTION,
  props<{ error: string | null }>()
);

export const updateBookmark = createAction(
  UPDATE_BOOKMARK_ACTION,
  props<{ bookmark: IBookmark }>()
);

export const updateBookmarkSuccess = createAction(
  UPDATE_BOOKMARK_SUCCESS_ACTION,
  props<{ bookmark: Update<IBookmark> }>()
);

export const updateBookmarkFail = createAction(
  UPDATE_BOOKMARK_FAIL_ACTION,
  props<{ error: string | null }>()
);
