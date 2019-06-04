import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginRouteGuardService } from './services/login-route-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'pages',
    canActivate: [LoginRouteGuardService],
    loadChildren: 'app/pages/pages.module#PagesModule'
  },
  { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
});
