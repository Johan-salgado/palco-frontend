import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api';
import { Persona } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private url = `${API_URL}/auth`;

  login(email: string, clave: string): Observable<Persona> {
    return this.http.post<Persona>(`${this.url}/login`, { email, clave });
  }

  registro(datos: any): Observable<Persona> {
    return this.http.post<Persona>(`${this.url}/registro`, datos);
  }

  guardarSesion(persona: Persona) {
    localStorage.setItem('usuario', JSON.stringify(persona));
  }

  getUsuario(): Persona | null {
    const texto = localStorage.getItem('usuario');
    return texto ? JSON.parse(texto) : null;
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
  }
}
