import { Routes } from '@angular/router';

export const bookmarkRoutes: Routes = [
  {
    path: 'bookmark',

    children: [
      {
        path: '',
        loadComponent: () =>
          import('../pages/bookmark/bookmark.component').then(
            (m) => m.BookmarkComponent
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('../pages/bookmark/add-bookmark/add-bookmark.component').then(
            (m) => m.AddBookmarkComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            '../pages/bookmark/edit-bookmark/edit-bookmark.component'
          ).then((m) => m.EditBookmarkComponent),
      },
    ],
  },
];
