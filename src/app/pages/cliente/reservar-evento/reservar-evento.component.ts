import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Evento } from '../../../models/models';
import { AuthService } from '../../../services/auth.service';
import { EventoService } from '../../../services/evento.service';
import { ReservaService } from '../../../services/reserva.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';
import { mensajeError } from '../../../utils/mensajes';

@Component({
  selector: 'app-reservar-evento',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, RouterLink, EstadoBadgeComponent],
  templateUrl: './reservar-evento.component.html',
  styleUrl: './reservar-evento.component.scss',
})
export class ReservarEventoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private eventoService = inject(EventoService);
  private reservaService = inject(ReservaService);

  evento?: Evento;
  entradas = 1;
  observaciones = '';
  error = '';

  ngOnInit() {
    const codigo = Number(this.route.snapshot.paramMap.get('codigo'));

    this.eventoService.getEvento(codigo).subscribe({
      next: (evento) => {
        this.evento = evento;
      },
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }

  get total(): number {
    return this.evento ? this.evento.precio * this.entradas : 0;
  }

  reservar() {
    const usuario = this.authService.getUsuario();

    if (!usuario || !this.evento) {
      return;
    }

    this.error = '';

    const reserva = {
      id_cliente: usuario.identificacion,
      codigo_evento: this.evento.codigo,
      entradas: this.entradas,
      observaciones: this.observaciones,
    };

    this.reservaService.crear(reserva).subscribe({
      next: () => {
        this.router.navigate(['/cliente/mis-reservas']);
      },
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }
}
