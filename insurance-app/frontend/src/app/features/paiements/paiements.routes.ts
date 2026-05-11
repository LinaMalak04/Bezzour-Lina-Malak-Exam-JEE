import { Routes } from '@angular/router';

export const PAIEMENTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./paiements-list/paiements-list.component').then(m => m.PaiementsListComponent) }
];
