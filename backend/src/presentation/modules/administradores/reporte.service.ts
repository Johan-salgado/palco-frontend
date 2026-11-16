import { pool } from '../../../config/database';

export class ReporteService {
  async getResumen() {
    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM cliente)::int AS clientes,
        (SELECT COUNT(*) FROM agente)::int AS agentes,
        (SELECT COUNT(*) FROM administrador)::int AS administradores,
        (SELECT COUNT(*) FROM reserva)::int AS reservas,
        (SELECT COUNT(*) FROM evento)::int AS eventos
    `);
    return result.rows[0];
  }

  async getIngresosPorAgente() {
    const result = await pool.query(`
      SELECT p.identificacion, p.nombre AS agente,
        COUNT(r.id)::int AS reservas,
        COALESCE(SUM(r.total), 0)::int AS ingresos_totales,
        COALESCE(ROUND(AVG(r.total)), 0)::int AS promedio_por_reserva
      FROM agente a
      INNER JOIN persona p ON p.identificacion = a.identificacion
      LEFT JOIN evento e ON e.id_agente = a.identificacion
      LEFT JOIN reserva r ON r.codigo_evento = e.codigo AND r.estado = 'Confirmada'
      GROUP BY p.identificacion, p.nombre
      ORDER BY p.nombre
    `);
    return result.rows;
  }

  async getIngresosPorCliente() {
    const result = await pool.query(`
      SELECT p.identificacion, p.nombre AS cliente,
        COUNT(r.id)::int AS reservas,
        COALESCE(SUM(r.total), 0)::int AS ingresos_totales,
        COALESCE(ROUND(AVG(r.total)), 0)::int AS promedio_por_reserva
      FROM cliente c
      INNER JOIN persona p ON p.identificacion = c.identificacion
      LEFT JOIN reserva r ON r.id_cliente = c.identificacion AND r.estado = 'Confirmada'
      GROUP BY p.identificacion, p.nombre
      ORDER BY p.nombre
    `);
    return result.rows;
  }

  async getIngresosPorMes() {
    const result = await pool.query(`
      SELECT m.mes, COALESCE(SUM(r.total), 0)::int AS ingresos
      FROM generate_series(1, 12) AS m(mes)
      LEFT JOIN reserva r ON EXTRACT(MONTH FROM r.fecha) = m.mes
        AND EXTRACT(YEAR FROM r.fecha) = 2026
        AND r.estado = 'Confirmada'
      GROUP BY m.mes
      ORDER BY m.mes
    `);
    return result.rows;
  }

  async getReservasPorEventoYMes() {
    const result = await pool.query(`
      SELECT e.codigo, e.nombre AS evento, EXTRACT(MONTH FROM r.fecha)::int AS mes, COUNT(r.id)::int AS reservas
      FROM reserva r
      INNER JOIN evento e ON e.codigo = r.codigo_evento
      WHERE EXTRACT(YEAR FROM r.fecha) = 2026
      GROUP BY e.codigo, e.nombre, EXTRACT(MONTH FROM r.fecha)
      ORDER BY e.nombre, mes
    `);
    return result.rows;
  }

  async getEventosPorAgenteYCiudad() {
    const result = await pool.query(`
      SELECT p.nombre AS agente, c.nombre AS ciudad, COUNT(e.codigo)::int AS eventos
      FROM evento e
      INNER JOIN persona p ON p.identificacion = e.id_agente
      INNER JOIN ciudad c ON c.id = e.id_ciudad
      GROUP BY p.nombre, c.nombre
      ORDER BY p.nombre, c.nombre
    `);
    return result.rows;
  }

  async getEventosPorUbicacion() {
    const result = await pool.query(`
      SELECT pa.nombre AS pais, d.nombre AS departamento, c.nombre AS ciudad, e.codigo, e.nombre AS evento, e.estado
      FROM evento e
      INNER JOIN ciudad c ON c.id = e.id_ciudad
      INNER JOIN departamento d ON d.id = c.id_departamento
      INNER JOIN pais pa ON pa.id = d.id_pais
      ORDER BY pa.nombre, d.nombre, c.nombre, e.nombre
    `);
    return result.rows;
  }

  async getHistorialReservas(idCliente?: string) {
    const result = await pool.query(
      `
      SELECT r.id, p.identificacion AS id_cliente, p.nombre AS cliente, e.nombre AS evento,
        to_char(r.fecha, 'YYYY-MM-DD"T"HH24:MI:SS') AS fecha, r.entradas, r.total, r.estado
      FROM reserva r
      INNER JOIN persona p ON p.identificacion = r.id_cliente
      INNER JOIN evento e ON e.codigo = r.codigo_evento
      WHERE ($1::text IS NULL OR r.id_cliente = $1)
      ORDER BY p.nombre, r.fecha DESC
    `,
      [idCliente ?? null],
    );
    return result.rows;
  }

  async getReservasCanceladas() {
    const result = await pool.query(`
      SELECT r.id, p.nombre AS cliente, e.nombre AS evento, r.causa_cancelacion
      FROM reserva r
      INNER JOIN persona p ON p.identificacion = r.id_cliente
      INNER JOIN evento e ON e.codigo = r.codigo_evento
      WHERE r.estado = 'Cancelada'
      ORDER BY r.id
    `);
    return result.rows;
  }

  async getEventosCancelados() {
    const result = await pool.query(`
      SELECT e.codigo, e.nombre AS evento, p.nombre AS agente, e.causa_cancelacion
      FROM evento e
      INNER JOIN persona p ON p.identificacion = e.id_agente
      WHERE e.estado = 'Cancelado'
      ORDER BY e.codigo
    `);
    return result.rows;
  }
}
