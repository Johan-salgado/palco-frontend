import { Injectable } from '@angular/core';
import { USUARIOS } from '../mocks/mock-data';
import { Usuario } from '../models/models';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  getUsuarios(): Usuario[] {
    return USUARIOS;
  }

  getUsuario(id: number): Usuario | undefined {
    return USUARIOS.find((u) => u.id === id);
  }
}
