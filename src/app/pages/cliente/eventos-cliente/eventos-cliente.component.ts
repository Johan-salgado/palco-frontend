import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Evento } from '../../../models/models';
import { EventoService } from '../../../services/evento.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';

@Component({
  selector: 'app-eventos-cliente',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, RouterLink, EstadoBadgeComponent],
  templateUrl: './eventos-cliente.component.html',
  styleUrl: './eventos-cliente.component.scss',
})
export class EventosClienteComponent {
  private eventoService = inject(EventoService);

  eventos: Evento[] = this.eventoService.getEventosDisponibles();
  busqueda = '';

  filtrar(): Evento[] {
    const texto = this.busqueda.toLowerCase();
    return this.eventos.filter((e) => e.nombre.toLowerCase().includes(texto) || e.ciudad.toLowerCase().includes(texto));
  }
}
