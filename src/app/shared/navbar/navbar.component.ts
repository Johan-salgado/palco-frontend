import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  usuario = this.authService.getUsuario();
  menuAbierto = false;

  inicio(): string {
    if (this.usuario?.rol === 'agente') {
      return '/agente/eventos';
    }
    if (this.usuario?.rol === 'administrador') {
      return '/admin/dashboard';
    }
    return '/cliente/eventos';
  }

  cambiarMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  salir() {
    this.authService.cerrarSesion();
    this.router.navigate(['/auth/login']);
  }
}
