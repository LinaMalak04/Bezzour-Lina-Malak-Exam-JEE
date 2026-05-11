import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'clients',
    canActivate: [authGuard],
    loadChildren: () => import('./features/clients/clients.routes').then(m => m.CLIENTS_ROUTES)
  },
  {
    path: 'contrats',
    canActivate: [authGuard],
    loadChildren: () => import('./features/contrats/contrats.routes').then(m => m.CONTRATS_ROUTES)
  },
  {
    path: 'paiements',
    canActivate: [authGuard],
    loadChildren: () => import('./features/paiements/paiements.routes').then(m => m.PAIEMENTS_ROUTES)
  },
  { path: '**', redirectTo: 'dashboard' }
];
