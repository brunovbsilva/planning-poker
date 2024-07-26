import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { inject } from '@angular/core';
import { UserService } from './services/user/user.service';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canMatch: [() => inject(UserService).logged$()],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/pages-routing').then(x => x.routes),
      },
    ],
  },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
