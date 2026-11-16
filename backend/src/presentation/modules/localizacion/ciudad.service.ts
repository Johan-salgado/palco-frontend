import { pool } from '../../../config/database';
import { CustomError } from '../../../errors/custom.error';
import { Ciudad } from '../../../models/localizacion.model';
import { validarCampos, validarId } from '../../../utils/validar';

const SELECT_CIUDAD = `
  SELECT c.id, c.id_departamento, c.nombre, d.nombre AS departamento, d.id_pais, p.nombre AS pais
  FROM ciudad c
  INNER JOIN departamento d ON d.id = c.id_departamento
  INNER JOIN pais p ON p.id = d.id_pais
`;

export class CiudadService {
  async getAll(idDepartamento?: string): Promise<Ciudad[]> {
    if (idDepartamento) {
      const result = await pool.query(`${SELECT_CIUDAD} WHERE c.id_departamento = $1 ORDER BY c.nombre`, [validarId(idDepartamento)]);
      return result.rows;
    }

    const result = await pool.query(`${SELECT_CIUDAD} ORDER BY p.nombre, d.nombre, c.nombre`);
    return result.rows;
  }

  async getById(id: string): Promise<Ciudad> {
    const result = await pool.query(`${SELECT_CIUDAD} WHERE c.id = $1`, [validarId(id)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Ciudad no encontrada');
    }

    return result.rows[0];
  }

  async create(body: any): Promise<Ciudad> {
    validarCampos(body, ['id_departamento', 'nombre']);
    const result = await pool.query('INSERT INTO ciudad (id_departamento, nombre) VALUES ($1, $2) RETURNING id', [
      body.id_departamento,
      body.nombre,
    ]);
    return this.getById(String(result.rows[0].id));
  }

  async update(id: string, body: any): Promise<Ciudad> {
    validarCampos(body, ['id_departamento', 'nombre']);
    const result = await pool.query('UPDATE ciudad SET id_departamento = $1, nombre = $2 WHERE id = $3 RETURNING id', [
      body.id_departamento,
      body.nombre,
      validarId(id),
    ]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Ciudad no encontrada');
    }

    return this.getById(id);
  }

  async delete(id: string): Promise<{ mensaje: string }> {
    const result = await pool.query('DELETE FROM ciudad WHERE id = $1 RETURNING id', [validarId(id)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Ciudad no encontrada');
    }

    return { mensaje: 'Ciudad eliminada correctamente' };
  }
}
