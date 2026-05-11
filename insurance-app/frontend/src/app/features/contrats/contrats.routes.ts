import { Routes } from '@angular/router';

export const CONTRATS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./contrats-list/contrats-list.component').then(m => m.ContratsListComponent) }
];
