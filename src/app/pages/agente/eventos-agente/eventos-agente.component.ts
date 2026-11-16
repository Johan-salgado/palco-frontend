import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Evento } from '../../../models/models';
import { AuthService } from '../../../services/auth.service';
import { EventoService } from '../../../services/evento.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';
import { mensajeError } from '../../../utils/mensajes';

@Component({
  selector: 'app-eventos-agente',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, EstadoBadgeComponent],
  templateUrl: './eventos-agente.component.html',
  styleUrl: './eventos-agente.component.scss',
})
export class EventosAgenteComponent implements OnInit {
  private authService = inject(AuthService);
  private eventoService = inject(EventoService);

  eventos: Evento[] = [];
  error = '';

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    const usuario = this.authService.getUsuario();

    if (!usuario) {
      return;
    }

    this.eventoService.getPorAgente(usuario.identificacion).subscribe({
      next: (eventos) => {
        this.eventos = eventos;
      },
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }

  eliminar(evento: Evento) {
    if (!confirm(`¿Seguro que quieres eliminar el evento "${evento.nombre}"? También se eliminarán sus reservas.`)) {
      return;
    }

    this.eventoService.eliminar(evento.codigo).subscribe({
      next: () => this.cargar(),
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }
}
