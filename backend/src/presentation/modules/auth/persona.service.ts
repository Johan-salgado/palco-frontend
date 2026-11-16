import { pool } from '../../../config/database';
import { CustomError } from '../../../errors/custom.error';
import { Persona } from '../../../models/persona.model';
import { validarCampos } from '../../../utils/validar';

const ROLES = ['cliente', 'agente', 'administrador'];

const SELECT_PERSONA = `
  SELECT p.identificacion, p.nombre, p.email, p.direccion, p.rol, p.id_ciudad,
    ci.nombre AS ciudad, de.nombre AS departamento, pa.nombre AS pais,
    cl.puntos, cl.publicidad, ag.comision, ag.experiencia, ad.salario, ad.horario,
    COALESCE((SELECT array_agg(t.numero ORDER BY t.id) FROM telefono t WHERE t.identificacion = p.identificacion), '{}') AS telefonos
  FROM persona p
  INNER JOIN ciudad ci ON ci.id = p.id_ciudad
  INNER JOIN departamento de ON de.id = ci.id_departamento
  INNER JOIN pais pa ON pa.id = de.id_pais
  LEFT JOIN cliente cl ON cl.identificacion = p.identificacion
  LEFT JOIN agente ag ON ag.identificacion = p.identificacion
  LEFT JOIN administrador ad ON ad.identificacion = p.identificacion
`;

export class PersonaService {
  async getAll(rol?: string): Promise<Persona[]> {
    const result = await pool.query(`${SELECT_PERSONA} WHERE ($1::text IS NULL OR p.rol = $1) ORDER BY p.nombre`, [rol ?? null]);
    return result.rows;
  }

  async getById(id: string, rol?: string): Promise<Persona> {
    const result = await pool.query(`${SELECT_PERSONA} WHERE p.identificacion = $1 AND ($2::text IS NULL OR p.rol = $2)`, [
      id,
      rol ?? null,
    ]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Persona no encontrada');
    }

    return result.rows[0];
  }

  async create(body: any): Promise<Persona> {
    validarCampos(body, ['identificacion', 'nombre', 'email', 'clave', 'direccion', 'id_ciudad', 'rol']);

    if (!ROLES.includes(body.rol)) {
      throw CustomError.badRequest('El rol debe ser cliente, agente o administrador');
    }

    const identificacion = String(body.identificacion);
    const telefonos: string[] = Array.isArray(body.telefonos) ? body.telefonos : [];
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      await client.query(
        `INSERT INTO persona (identificacion, nombre, email, clave, direccion, id_ciudad, rol)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [identificacion, body.nombre, body.email, body.clave, body.direccion, body.id_ciudad, body.rol],
      );

      for (const numero of telefonos) {
        await client.query('INSERT INTO telefono (identificacion, numero) VALUES ($1, $2)', [identificacion, numero]);
      }

      if (body.rol === 'cliente') {
        await client.query('INSERT INTO cliente (identificacion, puntos, publicidad) VALUES ($1, $2, $3)', [
          identificacion,
          body.puntos ?? 0,
          body.publicidad ?? true,
        ]);
      } else if (body.rol === 'agente') {
        await client.query('INSERT INTO agente (identificacion, comision, experiencia) VALUES ($1, $2, $3)', [
          identificacion,
          body.comision ?? 0,
          body.experiencia ?? null,
        ]);
      } else {
        await client.query('INSERT INTO administrador (identificacion, salario, horario) VALUES ($1, $2, $3)', [
          identificacion,
          body.salario ?? 0,
          body.horario ?? null,
        ]);
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

    return this.getById(identificacion);
  }

  async update(id: string, body: any, rol?: string): Promise<Persona> {
    const actual = await this.getById(id, rol);
    const telefonos: string[] | null = Array.isArray(body.telefonos) ? body.telefonos : null;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      await client.query(
        `UPDATE persona
         SET nombre = $1, email = $2, direccion = $3, id_ciudad = $4, clave = COALESCE($5, clave)
         WHERE identificacion = $6`,
        [
          body.nombre ?? actual.nombre,
          body.email ?? actual.email,
          body.direccion ?? actual.direccion,
          body.id_ciudad ?? actual.id_ciudad,
          body.clave ?? null,
          id,
        ],
      );

      if (telefonos) {
        await client.query('DELETE FROM telefono WHERE identificacion = $1', [id]);

        for (const numero of telefonos) {
          await client.query('INSERT INTO telefono (identificacion, numero) VALUES ($1, $2)', [id, numero]);
        }
      }

      if (actual.rol === 'cliente') {
        await client.query('UPDATE cliente SET puntos = $1, publicidad = $2 WHERE identificacion = $3', [
          body.puntos ?? actual.puntos,
          body.publicidad ?? actual.publicidad,
          id,
        ]);
      } else if (actual.rol === 'agente') {
        await client.query('UPDATE agente SET comision = $1, experiencia = $2 WHERE identificacion = $3', [
          body.comision ?? actual.comision,
          body.experiencia ?? actual.experiencia,
          id,
        ]);
      } else {
        await client.query('UPDATE administrador SET salario = $1, horario = $2 WHERE identificacion = $3', [
          body.salario ?? actual.salario,
          body.horario ?? actual.horario,
          id,
        ]);
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

    return this.getById(id);
  }

  async delete(id: string, rol?: string): Promise<{ mensaje: string }> {
    await this.getById(id, rol);
    await pool.query('DELETE FROM persona WHERE identificacion = $1', [id]);
    return { mensaje: 'Registro eliminado correctamente' };
  }
}
