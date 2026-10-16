import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registrar-evento',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registrar-evento.component.html',
  styleUrl: './registrar-evento.component.scss',
})
export class RegistrarEventoComponent {
  estados = ['Programado', 'En Boletería', 'En Vivo', 'Finalizado', 'Cancelado'];
  ciudades = ['Bogotá', 'Bucaramanga', 'Cali', 'Medellín', 'Tuluá'];
  mensaje = '';

  guardar() {
    this.mensaje = 'Registro de prueba: todavía no se guarda información.';
  }
}
