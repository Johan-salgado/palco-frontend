import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  tipoCuenta = 'cliente';
  mensaje = '';

  registrar() {
    this.mensaje = 'Registro de prueba: todavía no se guarda información.';
  }
}
