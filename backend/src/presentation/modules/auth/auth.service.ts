import { pool } from '../../../config/database';
import { CustomError } from '../../../errors/custom.error';
import { Persona } from '../../../models/persona.model';
import { validarCampos } from '../../../utils/validar';
import { PersonaService } from './persona.service';

export class AuthService {
  private readonly personaService = new PersonaService();

  async login(body: any): Promise<Persona> {
    validarCampos(body, ['email', 'clave']);

    const result = await pool.query('SELECT identificacion FROM persona WHERE email = $1 AND clave = $2', [
      body.email,
      body.clave,
    ]);

    if (result.rows.length === 0) {
      throw CustomError.unAuthorized('Correo o contraseña incorrectos');
    }

    return this.personaService.getById(result.rows[0].identificacion);
  }

  async registro(body: any): Promise<Persona> {
    validarCampos(body, ['rol']);

    if (body.rol !== 'cliente' && body.rol !== 'agente') {
      throw CustomError.badRequest('Solo se pueden registrar clientes o agentes');
    }

    return this.personaService.create(body);
  }
}
