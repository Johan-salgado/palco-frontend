import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api';
import {
  EventoCancelado,
  EventosAgenteCiudad,
  EventoUbicacion,
  HistorialReserva,
  IngresoMes,
  IngresosAgente,
  IngresosCliente,
  ReservaCancelada,
  ReservasEventoMes,
  Resumen,
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private http = inject(HttpClient);
  private url = `${API_URL}/reportes`;

  getResumen(): Observable<Resumen> {
    return this.http.get<Resumen>(`${this.url}/resumen`);
  }

  getIngresosPorAgente(): Observable<IngresosAgente[]> {
    return this.http.get<IngresosAgente[]>(`${this.url}/ingresos-por-agente`);
  }

  getIngresosPorCliente(): Observable<IngresosCliente[]> {
    return this.http.get<IngresosCliente[]>(`${this.url}/ingresos-por-cliente`);
  }

  getIngresosPorMes(): Observable<IngresoMes[]> {
    return this.http.get<IngresoMes[]>(`${this.url}/ingresos-por-mes`);
  }

  getReservasPorEventoYMes(): Observable<ReservasEventoMes[]> {
    return this.http.get<ReservasEventoMes[]>(`${this.url}/reservas-por-evento-mes`);
  }

  getEventosPorAgenteYCiudad(): Observable<EventosAgenteCiudad[]> {
    return this.http.get<EventosAgenteCiudad[]>(`${this.url}/eventos-por-agente-ciudad`);
  }

  getEventosPorUbicacion(): Observable<EventoUbicacion[]> {
    return this.http.get<EventoUbicacion[]>(`${this.url}/eventos-por-ubicacion`);
  }

  getHistorialReservas(idCliente: string): Observable<HistorialReserva[]> {
    return this.http.get<HistorialReserva[]>(`${this.url}/historial-reservas?id_cliente=${idCliente}`);
  }

  getReservasCanceladas(): Observable<ReservaCancelada[]> {
    return this.http.get<ReservaCancelada[]>(`${this.url}/reservas-canceladas`);
  }

  getEventosCancelados(): Observable<EventoCancelado[]> {
    return this.http.get<EventoCancelado[]>(`${this.url}/eventos-cancelados`);
  }
}
