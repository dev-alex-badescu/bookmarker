import { Routes } from '@angular/router';
import { bookmarkRoutes } from './routes/bookmark.routes';
import { BookmarkEffects } from './state/bookmark/bookmark.effects';
import { BOOKMARK_STATE_NAME } from './state/shared/consts/store-name.const';
import { bookmarkReducer } from './state/bookmark/bookmark.reducer';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/bookmark',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    providers: [
      provideState(BOOKMARK_STATE_NAME, bookmarkReducer),
      provideEffects(BookmarkEffects),
    ],
    children: bookmarkRoutes,
  },
  {
    path: '**',
    redirectTo: 'home/bookmark',
  },
];
