import { Routes } from '@angular/router';

export const bookmarkRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/home/home.component').then((m) => m.HomeComponent),
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
      import('../pages/bookmark/edit-bookmark/edit-bookmark.component').then(
        (m) => m.EditBookmarkComponent
      ),
  },
];
