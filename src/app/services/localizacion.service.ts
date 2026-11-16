import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api';
import { Ciudad } from '../models/models';

@Injectable({ providedIn: 'root' })
export class LocalizacionService {
  private http = inject(HttpClient);

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${API_URL}/ciudades`);
  }
}
