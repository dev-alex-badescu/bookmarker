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

  getBookmarks() {
    return this.store.select(getBookmarks);
  }
}
