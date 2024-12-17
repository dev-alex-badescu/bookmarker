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
  updateBookmark,
  updateBookmarkSuccess,
  updateBookmarkFail,
} from './bookmark.actions';
import { Update } from '@ngrx/entity';
import { IBookmark } from '../../models/IBookmark.model';
import { ToastService } from '../../shared/services/toast/toast.service';
import { BookmarkStateService } from '../services/bookmark-state/bookmark-state.service';

@Injectable({
  providedIn: 'root',
})
export class BookmarkEffects {
  constructor(
    private bookmarkService: BookmarkService,
    private bookmarkStateService: BookmarkStateService,
    private toastService: ToastService
  ) {}

  loadBookmarks$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadBookmarks),
      switchMap(() => {
        return this.bookmarkService.getBookmarks().pipe(
          map((bookmarks) => {
            return loadBookmarksSuccess({
              bookmarks: this.orderByDate(bookmarks),
            });
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
            this.toastService.showSuccess(
              `${action.bookmark.name} bookmark has been created!`
            );

            return createBookmarkSuccess({ bookmark });
          }),
          catchError((error) => {
            this.toastService.showError('Failed to create bookmark.');
            return of(createBookmarkFail(error));
          })
        );
      })
    );
  });

  updateBookmark$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(updateBookmark),
      switchMap((action) => {
        return this.bookmarkService.updateBookmark(action.bookmark).pipe(
          map(() => {
            const bookmark: Update<IBookmark> = {
              id: action.bookmark.id ?? 0,
              changes: {
                ...action.bookmark,
              },
            };
            this.toastService.showSuccess(
              `${action.bookmark.name} bookmark has been updated!`
            );
            return updateBookmarkSuccess({
              bookmark: bookmark,
            });
          }),
          catchError((error) => {
            this.toastService.showError('Failed to update bookmark.');
            return of(updateBookmarkFail(error));
          })
        );
      })
    );
  });

  // updateBookmarkSuccess$ = createEffect(
  //   () => {
  //     return inject(Actions).pipe(
  //       ofType(updateBookmarkSuccess),
  //       tap(() => {
  //         console.log('DAAAAA INTRA AICI');
  //         this.bookmarkStateService.dispatchLoadBookmarks();
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  private orderByDate(bookmarks: IBookmark[]) {
    const sortedBookmarks = bookmarks.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return sortedBookmarks;
  }
}