import { inject, Injectable } from '@angular/core';
import { RESERVAS } from '../mocks/mock-data';
import { Reserva, ReservaDetalle } from '../models/models';
import { EventoService } from './evento.service';
import { UsuarioService } from './usuario.service';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private eventoService = inject(EventoService);
  private usuarioService = inject(UsuarioService);

  private agregarDetalle(reserva: Reserva): ReservaDetalle {
    const evento = this.eventoService.getEvento(reserva.eventoCodigo);
    const cliente = this.usuarioService.getUsuario(reserva.clienteId);
    return {
      ...reserva,
      nombreEvento: evento ? evento.nombre : '',
      ciudad: evento ? evento.ciudad : '',
      nombreCliente: cliente ? cliente.nombre : '',
    };
  }

  getReservas(): Reserva[] {
    return RESERVAS;
  }

  getReservasPorCliente(clienteId: number): ReservaDetalle[] {
    return RESERVAS.filter((r) => r.clienteId === clienteId).map((r) => this.agregarDetalle(r));
  }

  getReservasPorAgente(agenteId: number): ReservaDetalle[] {
    const codigos = this.eventoService.getEventosPorAgente(agenteId).map((e) => e.codigo);
    return RESERVAS.filter((r) => codigos.includes(r.eventoCodigo)).map((r) => this.agregarDetalle(r));
  }
}
