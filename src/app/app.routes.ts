import { Routes } from '@angular/router';
import { bookmarkRoutes } from './routes/bookmark.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    children: bookmarkRoutes,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
