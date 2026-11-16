import { pool } from '../../../config/database';
import { CustomError } from '../../../errors/custom.error';
import { Reserva } from '../../../models/reserva.model';
import { validarCampos, validarId } from '../../../utils/validar';

const ESTADOS = ['Reservada', 'Confirmada', 'Cancelada'];
const ESTADOS_EVENTO_DISPONIBLE = ['Programado', 'En Boletería', 'En Vivo'];

const SELECT_RESERVA = `
  SELECT r.id, r.id_cliente, r.codigo_evento,
    to_char(r.fecha, 'YYYY-MM-DD"T"HH24:MI:SS') AS fecha,
    r.entradas, r.total, r.observaciones, r.estado, r.causa_cancelacion,
    p.nombre AS cliente, e.nombre AS evento, c.nombre AS ciudad
  FROM reserva r
  INNER JOIN persona p ON p.identificacion = r.id_cliente
  INNER JOIN evento e ON e.codigo = r.codigo_evento
  INNER JOIN ciudad c ON c.id = e.id_ciudad
`;

export class ReservaService {
  async getAll(): Promise<Reserva[]> {
    const result = await pool.query(`${SELECT_RESERVA} ORDER BY r.fecha DESC`);
    return result.rows;
  }

  async getByCliente(idCliente: string): Promise<Reserva[]> {
    const result = await pool.query(`${SELECT_RESERVA} WHERE r.id_cliente = $1 ORDER BY r.fecha DESC`, [idCliente]);
    return result.rows;
  }

  async getByAgente(idAgente: string): Promise<Reserva[]> {
    const result = await pool.query(`${SELECT_RESERVA} WHERE e.id_agente = $1 ORDER BY r.fecha DESC`, [idAgente]);
    return result.rows;
  }

  async getById(id: string): Promise<Reserva> {
    const result = await pool.query(`${SELECT_RESERVA} WHERE r.id = $1`, [validarId(id)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Reserva no encontrada');
    }

    return result.rows[0];
  }

  async create(body: any): Promise<Reserva> {
    validarCampos(body, ['id_cliente', 'codigo_evento', 'entradas']);

    const entradas = Number(body.entradas);

    if (!Number.isInteger(entradas) || entradas <= 0) {
      throw CustomError.badRequest('El número de entradas debe ser mayor a cero');
    }

    const eventoResult = await pool.query('SELECT precio, capacidad, estado FROM evento WHERE codigo = $1', [body.codigo_evento]);

    if (eventoResult.rows.length === 0) {
      throw CustomError.notFound('Evento no encontrado');
    }

    const evento = eventoResult.rows[0];

    if (!ESTADOS_EVENTO_DISPONIBLE.includes(evento.estado)) {
      throw CustomError.badRequest('El evento no está disponible para reservas');
    }

    const reservadasResult = await pool.query(
      `SELECT COALESCE(SUM(entradas), 0)::int AS total FROM reserva WHERE codigo_evento = $1 AND estado <> 'Cancelada'`,
      [body.codigo_evento],
    );

    if (reservadasResult.rows[0].total + entradas > evento.capacidad) {
      throw CustomError.conflict('No hay suficientes entradas disponibles');
    }

    const result = await pool.query(
      `INSERT INTO reserva (id_cliente, codigo_evento, entradas, total, observaciones, estado)
       VALUES ($1, $2, $3, $4, $5, 'Reservada')
       RETURNING id`,
      [body.id_cliente, body.codigo_evento, entradas, evento.precio * entradas, body.observaciones ?? ''],
    );

    return this.getById(String(result.rows[0].id));
  }

  async update(id: string, body: any): Promise<Reserva> {
    const actual = await this.getById(id);
    const entradas = Number(body.entradas ?? actual.entradas);
    const estado = body.estado ?? actual.estado;

    if (!Number.isInteger(entradas) || entradas <= 0) {
      throw CustomError.badRequest('El número de entradas debe ser mayor a cero');
    }

    if (!ESTADOS.includes(estado)) {
      throw CustomError.badRequest('El estado de la reserva no es válido');
    }

    const eventoResult = await pool.query('SELECT precio FROM evento WHERE codigo = $1', [actual.codigo_evento]);
    const causa =
      estado === 'Cancelada' ? (body.causa_cancelacion ?? actual.causa_cancelacion ?? 'Sin causa especificada') : null;

    await pool.query(
      `UPDATE reserva
       SET entradas = $1, total = $2, observaciones = $3, estado = $4, causa_cancelacion = $5
       WHERE id = $6`,
      [entradas, eventoResult.rows[0].precio * entradas, body.observaciones ?? actual.observaciones, estado, causa, validarId(id)],
    );

    return this.getById(id);
  }

  async delete(id: string): Promise<{ mensaje: string }> {
    const result = await pool.query('DELETE FROM reserva WHERE id = $1 RETURNING id', [validarId(id)]);

    if (result.rows.length === 0) {
      throw CustomError.notFound('Reserva no encontrada');
    }

    return { mensaje: 'Reserva eliminada correctamente' };
  }
}
