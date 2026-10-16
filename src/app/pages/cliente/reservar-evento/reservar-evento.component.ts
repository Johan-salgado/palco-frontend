import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Evento } from '../../../models/models';
import { EventoService } from '../../../services/evento.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';

@Component({
  selector: 'app-reservar-evento',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, RouterLink, EstadoBadgeComponent],
  templateUrl: './reservar-evento.component.html',
  styleUrl: './reservar-evento.component.scss',
})
export class ReservarEventoComponent {
  private route = inject(ActivatedRoute);
  private eventoService = inject(EventoService);

  evento?: Evento;
  entradas = 1;
  mensaje = '';

  constructor() {
    const codigo = this.route.snapshot.paramMap.get('codigo') ?? '';
    this.evento = this.eventoService.getEvento(codigo);
  }

  get total(): number {
    return this.evento ? this.evento.precioBase * this.entradas : 0;
  }

  reservar() {
    this.mensaje = 'Reserva de prueba: todavía no se guarda información.';
  }
}
