import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { loggedUserGuard } from './guards/logged-user.guard';

const routes: Routes = [
  { 
    path: '',
    component: LayoutComponent,
    canMatch: [ loggedUserGuard ],
    children: [
      { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) }
    ]
  },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true, anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
