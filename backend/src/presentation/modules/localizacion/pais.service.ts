import { pool } from '../../../config/database';
import { CustomError } from '../../../errors/custom.error';
import { Pais } from '../../../models/localizacion.model';
import { validarCampos, validarId } from '../../../utils/validar';

export class PaisService {
  async getAll(): Promise<Pais[]> {
    const result = await pool.query('SELECT * FROM pais ORDER BY nombre');
    return result.rows;
  }

  async getById(id: string): Promise<Pais> {
    const result = await pool.query('SELECT * FROM pais WHERE id = $1', [validarId(id)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('País no encontrado');
    }

    return result.rows[0];
  }

  async create(body: any): Promise<Pais> {
    validarCampos(body, ['nombre']);
    const result = await pool.query('INSERT INTO pais (nombre) VALUES ($1) RETURNING *', [body.nombre]);
    return result.rows[0];
  }

  async update(id: string, body: any): Promise<Pais> {
    validarCampos(body, ['nombre']);
    const result = await pool.query('UPDATE pais SET nombre = $1 WHERE id = $2 RETURNING *', [body.nombre, validarId(id)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('País no encontrado');
    }

    return result.rows[0];
  }

  async delete(id: string): Promise<{ mensaje: string }> {
    const result = await pool.query('DELETE FROM pais WHERE id = $1 RETURNING id', [validarId(id)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('País no encontrado');
    }

    return { mensaje: 'País eliminado correctamente' };
  }
}
