import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Evento } from '../../../models/models';
import { EventoService } from '../../../services/evento.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';
import { mensajeError } from '../../../utils/mensajes';

@Component({
  selector: 'app-eventos-cliente',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, RouterLink, EstadoBadgeComponent],
  templateUrl: './eventos-cliente.component.html',
  styleUrl: './eventos-cliente.component.scss',
})
export class EventosClienteComponent implements OnInit {
  private eventoService = inject(EventoService);

  eventos: Evento[] = [];
  busqueda = '';
  error = '';

  ngOnInit() {
    this.eventoService.getDisponibles().subscribe({
      next: (eventos) => {
        this.eventos = eventos;
      },
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }

  filtrar(): Evento[] {
    const texto = this.busqueda.toLowerCase();
    return this.eventos.filter((e) => e.nombre.toLowerCase().includes(texto) || e.ciudad.toLowerCase().includes(texto));
  }

  disponibles(evento: Evento): number {
    return evento.capacidad - evento.entradas_reservadas;
  }
}
