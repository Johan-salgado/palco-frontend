import { pool } from '../../../config/database';
import { CustomError } from '../../../errors/custom.error';
import { Evento } from '../../../models/evento.model';
import { validarCampos, validarId } from '../../../utils/validar';

const ESTADOS = ['Programado', 'En Boletería', 'En Vivo', 'Finalizado', 'Cancelado'];

const SELECT_EVENTO = `
  SELECT e.codigo, e.id_agente, e.id_ciudad, e.nombre, e.descripcion, e.teatro,
    to_char(e.fecha_inicio, 'YYYY-MM-DD"T"HH24:MI:SS') AS fecha_inicio,
    to_char(e.fecha_fin, 'YYYY-MM-DD"T"HH24:MI:SS') AS fecha_fin,
    e.capacidad, e.precio, e.observaciones, e.estado, e.causa_cancelacion,
    p.nombre AS agente, c.nombre AS ciudad, d.nombre AS departamento, pa.nombre AS pais,
    COALESCE((SELECT SUM(r.entradas) FROM reserva r WHERE r.codigo_evento = e.codigo AND r.estado <> 'Cancelada'), 0)::int AS entradas_reservadas
  FROM evento e
  INNER JOIN persona p ON p.identificacion = e.id_agente
  INNER JOIN ciudad c ON c.id = e.id_ciudad
  INNER JOIN departamento d ON d.id = c.id_departamento
  INNER JOIN pais pa ON pa.id = d.id_pais
`;

export class EventoService {
  async getAll(): Promise<Evento[]> {
    const result = await pool.query(`${SELECT_EVENTO} ORDER BY e.fecha_inicio`);
    return result.rows;
  }

  async getDisponibles(): Promise<Evento[]> {
    const result = await pool.query(
      `${SELECT_EVENTO} WHERE e.estado IN ('Programado', 'En Boletería', 'En Vivo') ORDER BY e.fecha_inicio`,
    );
    return result.rows;
  }

  async getByAgente(idAgente: string): Promise<Evento[]> {
    const result = await pool.query(`${SELECT_EVENTO} WHERE e.id_agente = $1 ORDER BY e.fecha_inicio`, [idAgente]);
    return result.rows;
  }

  async getById(codigo: string): Promise<Evento> {
    const result = await pool.query(`${SELECT_EVENTO} WHERE e.codigo = $1`, [validarId(codigo)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Evento no encontrado');
    }

    return result.rows[0];
  }

  private validar(body: any): void {
    validarCampos(body, ['id_agente', 'id_ciudad', 'nombre', 'teatro', 'fecha_inicio', 'fecha_fin', 'capacidad', 'precio']);

    if (Number(body.capacidad) <= 0) {
      throw CustomError.badRequest('La capacidad debe ser mayor a cero');
    }

    if (Number(body.precio) < 0) {
      throw CustomError.badRequest('El precio no puede ser negativo');
    }

    if (new Date(body.fecha_fin) <= new Date(body.fecha_inicio)) {
      throw CustomError.badRequest('La fecha de finalización debe ser posterior a la fecha de inicio');
    }

    if (body.estado && !ESTADOS.includes(body.estado)) {
      throw CustomError.badRequest('El estado del evento no es válido');
    }

    if (body.estado === 'Cancelado' && !body.causa_cancelacion) {
      throw CustomError.badRequest('Debe indicar la causa de la cancelación');
    }
  }

  async create(body: any): Promise<Evento> {
    this.validar(body);

    const result = await pool.query(
      `INSERT INTO evento (id_agente, id_ciudad, nombre, descripcion, teatro, fecha_inicio, fecha_fin, capacidad, precio, observaciones, estado, causa_cancelacion)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING codigo`,
      [
        body.id_agente,
        body.id_ciudad,
        body.nombre,
        body.descripcion ?? '',
        body.teatro,
        body.fecha_inicio,
        body.fecha_fin,
        body.capacidad,
        body.precio,
        body.observaciones ?? '',
        body.estado ?? 'Programado',
        body.estado === 'Cancelado' ? body.causa_cancelacion : null,
      ],
    );

    return this.getById(String(result.rows[0].codigo));
  }

  async update(codigo: string, body: any): Promise<Evento> {
    this.validar(body);

    const result = await pool.query(
      `UPDATE evento
       SET id_agente = $1, id_ciudad = $2, nombre = $3, descripcion = $4, teatro = $5, fecha_inicio = $6,
           fecha_fin = $7, capacidad = $8, precio = $9, observaciones = $10, estado = $11, causa_cancelacion = $12
       WHERE codigo = $13
       RETURNING codigo`,
      [
        body.id_agente,
        body.id_ciudad,
        body.nombre,
        body.descripcion ?? '',
        body.teatro,
        body.fecha_inicio,
        body.fecha_fin,
        body.capacidad,
        body.precio,
        body.observaciones ?? '',
        body.estado ?? 'Programado',
        body.estado === 'Cancelado' ? body.causa_cancelacion : null,
        validarId(codigo),
      ],
    );

    if (result.rows.length === 0) {
      throw CustomError.notFound('Evento no encontrado');
    }

    if (body.estado === 'Cancelado') {
      await pool.query(
        `UPDATE reserva
         SET estado = 'Cancelada', causa_cancelacion = 'Evento cancelado por el organizador'
         WHERE codigo_evento = $1 AND estado <> 'Cancelada'`,
        [validarId(codigo)],
      );
    }

    return this.getById(codigo);
  }

  async delete(codigo: string): Promise<{ mensaje: string }> {
    const result = await pool.query('DELETE FROM evento WHERE codigo = $1 RETURNING codigo', [validarId(codigo)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Evento no encontrado');
    }

    return { mensaje: 'Evento eliminado correctamente' };
  }
}
