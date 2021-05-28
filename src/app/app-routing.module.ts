import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './AuthGuard';
import { LoginComponent } from './login/login.component';

//These are the routes for whole application and protected by roles using AuthGuard provider

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard], data: { roles: ["user"] }
  },
  {
    path: 'physician', loadChildren: () => import('./physician/physician.module').then(m => m.PhysicianModule),
    canActivate: [AuthGuard], data: { roles: ["physician"] }
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard], data: { roles: ["user"] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
