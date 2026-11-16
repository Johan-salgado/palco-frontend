import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../../../models/models';
import { AuthService } from '../../../services/auth.service';
import { ReservaService } from '../../../services/reserva.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';
import { mensajeError } from '../../../utils/mensajes';

@Component({
  selector: 'app-reservas-agente',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, EstadoBadgeComponent],
  templateUrl: './reservas-agente.component.html',
  styleUrl: './reservas-agente.component.scss',
})
export class ReservasAgenteComponent implements OnInit {
  private authService = inject(AuthService);
  private reservaService = inject(ReservaService);

  estados = ['Reservada', 'Confirmada', 'Cancelada'];
  reservas: Reserva[] = [];
  error = '';

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    const usuario = this.authService.getUsuario();

    if (!usuario) {
      return;
    }

    this.reservas = [];

    this.reservaService.getPorAgente(usuario.identificacion).subscribe({
      next: (reservas) => {
        this.reservas = reservas;
      },
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }

  cambiarEstado(reserva: Reserva, estado: string) {
    let causa = null;

    if (estado === 'Cancelada') {
      causa = prompt('Escribe la causa de la cancelación:');

      if (!causa) {
        this.cargar();
        return;
      }
    }

    this.reservaService.actualizar(reserva.id, { estado, causa_cancelacion: causa }).subscribe({
      next: () => this.cargar(),
      error: (err) => {
        this.error = mensajeError(err);
        this.cargar();
      },
    });
  }
}
