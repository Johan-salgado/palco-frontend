import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const rolGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const usuario = authService.getUsuario();

  if (usuario && usuario.rol === route.data['rol']) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};
