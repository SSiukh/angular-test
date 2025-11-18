import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'news',
    loadComponent: () => import('./features/news/news.component').then((m) => m.NewsComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
