import { inject, Injectable } from '@angular/core';
import { INGRESOS_POR_MES } from '../mocks/mock-data';
import { EventoService } from './evento.service';
import { ReservaService } from './reserva.service';
import { UsuarioService } from './usuario.service';

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private usuarioService = inject(UsuarioService);
  private eventoService = inject(EventoService);
  private reservaService = inject(ReservaService);

  getResumen() {
    const usuarios = this.usuarioService.getUsuarios();
    return [
      { titulo: 'Clientes', valor: usuarios.filter((u) => u.rol === 'cliente').length },
      { titulo: 'Agentes', valor: usuarios.filter((u) => u.rol === 'agente').length },
      { titulo: 'Administradores', valor: usuarios.filter((u) => u.rol === 'administrador').length },
      { titulo: 'Eventos', valor: this.eventoService.getEventos().length },
      { titulo: 'Reservas', valor: this.reservaService.getReservas().length },
    ];
  }

  getIngresosPorMes() {
    return INGRESOS_POR_MES;
  }

  getReservasPorEvento() {
    return this.eventoService.getEventos().map((e) => {
      const cantidad = this.reservaService.getReservas().filter((r) => r.eventoCodigo === e.codigo).length;
      return { evento: e.nombre, reservas: cantidad };
    });
  }

  getEventosPorAgente() {
    const filas: { agente: string; ciudad: string; eventos: number }[] = [];
    for (const e of this.eventoService.getEventos()) {
      const agente = this.usuarioService.getUsuario(e.agenteId)?.nombre ?? '';
      const fila = filas.find((f) => f.agente === agente && f.ciudad === e.ciudad);
      if (fila) {
        fila.eventos++;
      } else {
        filas.push({ agente: agente, ciudad: e.ciudad, eventos: 1 });
      }
    }
    return filas;
  }

  getEventosCancelados() {
    return this.eventoService.getEventos().filter((e) => e.estado === 'Cancelado');
  }

  getReservasCanceladas() {
    return this.reservaService.getReservas().filter((r) => r.estado === 'Cancelada');
  }
}
