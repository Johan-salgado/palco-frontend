import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { mensajeError } from '../../../utils/mensajes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  clave = '';
  error = '';

  ingresar() {
    this.error = '';

    this.authService.login(this.email, this.clave).subscribe({
      next: (persona) => {
        this.authService.guardarSesion(persona);

        if (persona.rol === 'cliente') {
          this.router.navigate(['/cliente/eventos']);
        } else if (persona.rol === 'agente') {
          this.router.navigate(['/agente/eventos']);
        } else {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }
}
