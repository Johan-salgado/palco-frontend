import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservaDetalle } from '../../../models/models';
import { ReservaService } from '../../../services/reserva.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, EstadoBadgeComponent],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.scss',
})
export class MisReservasComponent {
  private reservaService = inject(ReservaService);

  clienteId = 1;
  reservas: ReservaDetalle[] = this.reservaService.getReservasPorCliente(this.clienteId);
}
