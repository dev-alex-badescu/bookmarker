import { Action, createReducer, on } from '@ngrx/store';
import {
  loadBookmarks,
  loadBookmarksSuccess,
  loadBookmarksFail,
  createBookmark,
  createBookmarkSuccess,
  createBookmarkFail,
  updateBookmark,
  updateBookmarkSuccess,
  updateBookmarkFail,
} from './bookmark.actions';
import { bookmarkAdapter, initialState } from './bookmark.state';
import { BookmarkState } from '../shared/models/bookmark-state.model';

const _bookmarkReducer = createReducer(
  initialState,
  on(loadBookmarks, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loadBookmarksSuccess, (state, action) => {
    return bookmarkAdapter.setAll(action.bookmarks, {
      ...state,
      loading: false,
      error: null,
    });
  }),
  on(loadBookmarksFail, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(createBookmark, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(createBookmarkSuccess, (state, action) => {
    return bookmarkAdapter.addOne(action.bookmark, {
      ...state,
      loading: false,
      error: null,
    });
  }),
  on(createBookmarkFail, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(updateBookmark, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(updateBookmarkSuccess, (state, action) => {
    return bookmarkAdapter.updateOne(action.bookmark, {
      ...state,
      loading: false,
      error: null,
    });
  }),
  on(updateBookmarkFail, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

export function bookmarkReducer(
  state: BookmarkState | undefined,
  action: Action
): BookmarkState {
  return _bookmarkReducer(state ?? initialState, action);
}
