import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api';
import { Reserva } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private http = inject(HttpClient);
  private url = `${API_URL}/reservas`;

  getPorCliente(idCliente: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.url}/cliente/${idCliente}`);
  }

  getPorAgente(idAgente: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.url}/agente/${idAgente}`);
  }

  crear(reserva: any): Observable<Reserva> {
    return this.http.post<Reserva>(this.url, reserva);
  }

  actualizar(id: number, cambios: any): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.url}/${id}`, cambios);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
