import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api';
import { Evento } from '../models/models';

@Injectable({ providedIn: 'root' })
export class EventoService {
  private http = inject(HttpClient);
  private url = `${API_URL}/eventos`;

  getDisponibles(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.url}/disponibles`);
  }

  getPorAgente(idAgente: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.url}/agente/${idAgente}`);
  }

  getEvento(codigo: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.url}/${codigo}`);
  }

  crear(evento: any): Observable<Evento> {
    return this.http.post<Evento>(this.url, evento);
  }

  actualizar(codigo: number, evento: any): Observable<Evento> {
    return this.http.put<Evento>(`${this.url}/${codigo}`, evento);
  }

  eliminar(codigo: number): Observable<any> {
    return this.http.delete(`${this.url}/${codigo}`);
  }
}
