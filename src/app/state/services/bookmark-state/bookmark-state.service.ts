import { Injectable } from '@angular/core';
import {
  getBookmarkById,
  getBookmarkLoading,
  getBookmarks,
} from '../../bookmark/bookmark.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state';
import {
  createBookmark,
  loadBookmarks,
  updateBookmark,
} from '../../bookmark/bookmark.actions';
import { IBookmark } from '../../../models/IBookmark.model';
import { TimeRangeFilter } from '../../../shared/consts/timeRangeFilter.const';
import { isToday, isYesterday } from 'date-fns';
import { map, of } from 'rxjs';
import { getCurrentRoute } from '../../router/router.selector';

@Injectable({
  providedIn: 'root',
})
export class BookmarkStateService {
  constructor(private store: Store<AppState>) {}

  dispatchLoadBookmarks() {
    this.store.dispatch(loadBookmarks());
  }

  dispatchCreateBookmark(bookmark: IBookmark) {
    this.store.dispatch(createBookmark({ bookmark }));
  }

  dispatchUpdateBookmark(bookmark: IBookmark) {
    this.store.dispatch(updateBookmark({ bookmark }));
  }

  getBookmarkById() {
    return this.store.select(getBookmarkById());
  }

  getBookmarkLoading() {
    return this.store.select(getBookmarkLoading);
  }

  getCurrentRoute() {
    return this.store.select(getCurrentRoute);
  }

  getBookmarks(filter?: TimeRangeFilter) {
    return this.store
      .select(getBookmarks)
      .pipe(map((bookmarks) => this.applyFilter(bookmarks, filter)));
  }

  getFilterBookmarksByName(searchText: string) {
    const bookmarks$ = this.getBookmarks();

    if (!bookmarks$) {
      return of([]);
    }

    return bookmarks$.pipe(
      map((bookmarks) =>
        searchText
          ? bookmarks.filter((bookmark) =>
              bookmark.name.toLowerCase().includes(searchText.toLowerCase())
            )
          : []
      )
    );
  }

  private applyFilter(
    bookmarks: IBookmark[],
    filter?: TimeRangeFilter
  ): IBookmark[] {
    if (!filter) return bookmarks;

    const now = new Date();

    switch (filter) {
      case TimeRangeFilter.Today:
        return bookmarks.filter((b) => isToday(new Date(b.updatedAt)));
      case TimeRangeFilter.Yesterday:
        return bookmarks.filter((b) => isYesterday(new Date(b.updatedAt)));
      case TimeRangeFilter.Older:
        return bookmarks.filter(
          (b) =>
            new Date(b.updatedAt) < new Date(now.setDate(now.getDate() - 1))
        );
      default:
        return bookmarks;
    }
  }
}
