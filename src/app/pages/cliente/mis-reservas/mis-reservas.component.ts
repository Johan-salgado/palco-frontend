import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reserva } from '../../../models/models';
import { AuthService } from '../../../services/auth.service';
import { ReservaService } from '../../../services/reserva.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';
import { mensajeError } from '../../../utils/mensajes';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, EstadoBadgeComponent],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.scss',
})
export class MisReservasComponent implements OnInit {
  private authService = inject(AuthService);
  private reservaService = inject(ReservaService);

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

    this.reservaService.getPorCliente(usuario.identificacion).subscribe({
      next: (reservas) => {
        this.reservas = reservas;
      },
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }

  cancelar(reserva: Reserva) {
    if (!confirm('¿Seguro que quieres cancelar esta reserva?')) {
      return;
    }

    const cambios = { estado: 'Cancelada', causa_cancelacion: 'Cancelada por el cliente' };

    this.reservaService.actualizar(reserva.id, cambios).subscribe({
      next: () => this.cargar(),
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }

  eliminar(reserva: Reserva) {
    if (!confirm('¿Seguro que quieres eliminar esta reserva?')) {
      return;
    }

    this.reservaService.eliminar(reserva.id).subscribe({
      next: () => this.cargar(),
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }
}
