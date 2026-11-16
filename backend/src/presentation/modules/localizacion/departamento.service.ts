import { pool } from '../../../config/database';
import { CustomError } from '../../../errors/custom.error';
import { Departamento } from '../../../models/localizacion.model';
import { validarCampos, validarId } from '../../../utils/validar';

const SELECT_DEPARTAMENTO = `
  SELECT d.id, d.id_pais, d.nombre, p.nombre AS pais
  FROM departamento d
  INNER JOIN pais p ON p.id = d.id_pais
`;

export class DepartamentoService {
  async getAll(idPais?: string): Promise<Departamento[]> {
    if (idPais) {
      const result = await pool.query(`${SELECT_DEPARTAMENTO} WHERE d.id_pais = $1 ORDER BY d.nombre`, [validarId(idPais)]);
      return result.rows;
    }

    const result = await pool.query(`${SELECT_DEPARTAMENTO} ORDER BY p.nombre, d.nombre`);
    return result.rows;
  }

  async getById(id: string): Promise<Departamento> {
    const result = await pool.query(`${SELECT_DEPARTAMENTO} WHERE d.id = $1`, [validarId(id)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Departamento no encontrado');
    }

    return result.rows[0];
  }

  async create(body: any): Promise<Departamento> {
    validarCampos(body, ['id_pais', 'nombre']);
    const result = await pool.query('INSERT INTO departamento (id_pais, nombre) VALUES ($1, $2) RETURNING id', [body.id_pais, body.nombre]);
    return this.getById(String(result.rows[0].id));
  }

  async update(id: string, body: any): Promise<Departamento> {
    validarCampos(body, ['id_pais', 'nombre']);
    const result = await pool.query('UPDATE departamento SET id_pais = $1, nombre = $2 WHERE id = $3 RETURNING id', [
      body.id_pais,
      body.nombre,
      validarId(id),
    ]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Departamento no encontrado');
    }

    return this.getById(id);
  }

  async delete(id: string): Promise<{ mensaje: string }> {
    const result = await pool.query('DELETE FROM departamento WHERE id = $1 RETURNING id', [validarId(id)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Departamento no encontrado');
    }

    return { mensaje: 'Departamento eliminado correctamente' };
  }
}
