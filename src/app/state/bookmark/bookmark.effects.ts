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
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookmarkEffects {
  constructor(
    private router: Router,
    private bookmarkService: BookmarkService,
    private toastService: ToastService
  ) {}

  loadBookmarks$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(loadBookmarks),
      switchMap(() => {
        return this.bookmarkService.getBookmarks().pipe(
          map((bookmarks) => {
            return loadBookmarksSuccess({
              bookmarks: bookmarks,
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

  createBookmarkSuccess$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(createBookmarkSuccess),
        tap(() => {
          this.router.navigate(['/home/bookmark']);
        })
      );
    },
    { dispatch: false }
  );

  updateBookmarkSuccess$ = createEffect(
    () => {
      return inject(Actions).pipe(
        ofType(updateBookmarkSuccess),
        tap(() => {
          this.router.navigate(['/home/bookmark']);
        })
      );
    },
    { dispatch: false }
  );
}
