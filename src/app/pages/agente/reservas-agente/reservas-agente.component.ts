import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservaDetalle } from '../../../models/models';
import { ReservaService } from '../../../services/reserva.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';

@Component({
  selector: 'app-reservas-agente',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, EstadoBadgeComponent],
  templateUrl: './reservas-agente.component.html',
  styleUrl: './reservas-agente.component.scss',
})
export class ReservasAgenteComponent {
  private reservaService = inject(ReservaService);

  agenteId = 3;
  estados = ['Reservada', 'Confirmada', 'Cancelada'];
  reservas: ReservaDetalle[] = this.reservaService.getReservasPorAgente(this.agenteId);
}
