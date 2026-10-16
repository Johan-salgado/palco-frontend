import { Injectable } from '@angular/core';
import { EVENTOS } from '../mocks/mock-data';
import { Evento } from '../models/models';

@Injectable({ providedIn: 'root' })
export class EventoService {
  getEventos(): Evento[] {
    return EVENTOS;
  }

  getEventosDisponibles(): Evento[] {
    return EVENTOS.filter((e) => e.estado === 'Programado' || e.estado === 'En Boletería' || e.estado === 'En Vivo');
  }

  getEvento(codigo: string): Evento | undefined {
    return EVENTOS.find((e) => e.codigo === codigo);
  }

  getEventosPorAgente(agenteId: number): Evento[] {
    return EVENTOS.filter((e) => e.agenteId === agenteId);
  }
}
