import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { loggedUserGuard } from './guards/logged-user.guard';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, canMatch: [ loggedUserGuard ],
    children: [
      { path: '', loadChildren: () => import('./pages/pages-routing').then((x) => x.routes) }
    ]
  },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
