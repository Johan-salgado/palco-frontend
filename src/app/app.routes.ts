import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/registro',
    loadComponent: () => import('./pages/auth/registro/registro.component').then((m) => m.RegistroComponent),
  },

  {
    path: 'cliente/eventos',
    loadComponent: () => import('./pages/cliente/eventos-cliente/eventos-cliente.component').then((m) => m.EventosClienteComponent),
  },
  {
    path: 'cliente/reservar/:codigo',
    loadComponent: () => import('./pages/cliente/reservar-evento/reservar-evento.component').then((m) => m.ReservarEventoComponent),
  },
  {
    path: 'cliente/mis-reservas',
    loadComponent: () => import('./pages/cliente/mis-reservas/mis-reservas.component').then((m) => m.MisReservasComponent),
  },

  {
    path: 'agente/registrar-evento',
    loadComponent: () => import('./pages/agente/registrar-evento/registrar-evento.component').then((m) => m.RegistrarEventoComponent),
  },
  {
    path: 'agente/eventos',
    loadComponent: () => import('./pages/agente/eventos-agente/eventos-agente.component').then((m) => m.EventosAgenteComponent),
  },
  {
    path: 'agente/reservas',
    loadComponent: () => import('./pages/agente/reservas-agente/reservas-agente.component').then((m) => m.ReservasAgenteComponent),
  },

  {
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },

  { path: '**', redirectTo: 'auth/login' },
];
