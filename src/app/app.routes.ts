import { Routes } from '@angular/router';
import { rolGuard } from './guards/rol.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'registro',
        loadComponent: () => import('./pages/auth/registro/registro.component').then((m) => m.RegistroComponent),
      },
    ],
  },

  {
    path: 'cliente',
    canActivate: [rolGuard],
    data: { rol: 'cliente' },
    children: [
      {
        path: 'eventos',
        loadComponent: () => import('./pages/cliente/eventos-cliente/eventos-cliente.component').then((m) => m.EventosClienteComponent),
      },
      {
        path: 'reservar/:codigo',
        loadComponent: () => import('./pages/cliente/reservar-evento/reservar-evento.component').then((m) => m.ReservarEventoComponent),
      },
      {
        path: 'mis-reservas',
        loadComponent: () => import('./pages/cliente/mis-reservas/mis-reservas.component').then((m) => m.MisReservasComponent),
      },
    ],
  },

  {
    path: 'agente',
    canActivate: [rolGuard],
    data: { rol: 'agente' },
    children: [
      {
        path: 'registrar-evento',
        loadComponent: () => import('./pages/agente/registrar-evento/registrar-evento.component').then((m) => m.RegistrarEventoComponent),
      },
      {
        path: 'editar-evento/:codigo',
        loadComponent: () => import('./pages/agente/registrar-evento/registrar-evento.component').then((m) => m.RegistrarEventoComponent),
      },
      {
        path: 'eventos',
        loadComponent: () => import('./pages/agente/eventos-agente/eventos-agente.component').then((m) => m.EventosAgenteComponent),
      },
      {
        path: 'reservas',
        loadComponent: () => import('./pages/agente/reservas-agente/reservas-agente.component').then((m) => m.ReservasAgenteComponent),
      },
    ],
  },

  {
    path: 'admin',
    canActivate: [rolGuard],
    data: { rol: 'administrador' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
    ],
  },

  { path: '**', redirectTo: 'auth/login' },
];
