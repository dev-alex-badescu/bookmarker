import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOOKMARK_STATE_NAME } from '../shared/consts/store-name.const';
import { BookmarkState } from '../shared/models/bookmark-state.model';
import { bookmarkAdapter } from './bookmark.state';
import { getCurrentRoute } from '../router/router.selector';

const bookmarkFeatureSelector =
  createFeatureSelector<BookmarkState>(BOOKMARK_STATE_NAME);

export const bookmarkSelectors = bookmarkAdapter.getSelectors();

export const getBookmarkLoading = createSelector(
  bookmarkFeatureSelector,
  (state) => {
    return state.loading;
  }
);

export const getBookmarks = createSelector(
  bookmarkFeatureSelector,
  bookmarkSelectors.selectAll
);

export const getBookmarksEntities = createSelector(
  bookmarkFeatureSelector,
  bookmarkSelectors.selectEntities
);

export const getBookmarkById = (id?: string) => {
  return createSelector(
    getBookmarksEntities,
    getCurrentRoute,
    (bookmarks, router) => {
      const bookmarkId = router.params['id'] ?? id;
      return bookmarks ? bookmarks[parseInt(bookmarkId)] : null;
    }
  );
};
