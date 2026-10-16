import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);

  correo = '';
  clave = '';
  perfil = 'cliente';

  ingresar() {
    if (this.perfil === 'cliente') {
      this.router.navigate(['/cliente/eventos']);
    } else if (this.perfil === 'agente') {
      this.router.navigate(['/agente/eventos']);
    } else {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
