import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import {
  loadBookmarks,
  loadBookmarksSuccess,
  loadBookmarksFail,
  createBookmark,
  createBookmarkSuccess,
  createBookmarkFail,
} from './bookmark.actions';

@Injectable({
  providedIn: 'root',
})
export class BookmarkEffects {
  constructor(private bookmarkService: BookmarkService) {}

  loadBookmarks$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadBookmarks),
      switchMap(() => {
        return this.bookmarkService.getBookmarks().pipe(
          map((bookmarks) => {
            return loadBookmarksSuccess({ bookmarks });
          }),
          catchError((error) => {
            return of(loadBookmarksFail({ error }));
          })
        );
      })
    );
  });

  createBookmark$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(createBookmark),
      exhaustMap((action) => {
        return this.bookmarkService.createBookmark(action.bookmark).pipe(
          map((bookmark) => {
            return createBookmarkSuccess({ bookmark });
          }),
          catchError((error) => {
            return of(createBookmarkFail(error));
          })
        );
      })
    );
  });
}
