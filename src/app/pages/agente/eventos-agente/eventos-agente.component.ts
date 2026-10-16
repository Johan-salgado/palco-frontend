import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Evento } from '../../../models/models';
import { EventoService } from '../../../services/evento.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';

@Component({
  selector: 'app-eventos-agente',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, EstadoBadgeComponent],
  templateUrl: './eventos-agente.component.html',
  styleUrl: './eventos-agente.component.scss',
})
export class EventosAgenteComponent {
  private eventoService = inject(EventoService);

  agenteId = 3;
  eventos: Evento[] = this.eventoService.getEventosPorAgente(this.agenteId);
}
