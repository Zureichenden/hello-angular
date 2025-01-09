import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'users',
    loadChildren: () => import('./ui/components/user/user.routes').then(m => m.USER_ROUTES)
  },

  {
    path: 'articles',
    loadChildren: () => import('./ui/components/articles/article.routes').then(m => m.ARTICLE_ROUTES)
  },
  
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];
