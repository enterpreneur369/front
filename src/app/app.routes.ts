import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { Not404Component } from './pages/not404/not404.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { RandomComponent } from './login/forgot/random/random.component';
import { LayoutAccountComponent } from './pages/layout-account/layout-account.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/pages.routes').then((x) => x.pagesRoutes),
  },
  {
    path: 'account',
    component: LayoutAccountComponent,
    loadChildren: () =>
      import('./pages/account.routes').then((x) => x.accountRoutes),
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    children: [{ path: ':random', component: RandomComponent }],
  },
  { path: '**', component: Not404Component },
];
