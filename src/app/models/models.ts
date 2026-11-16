export interface Ciudad {
  id: number;
  id_departamento: number;
  nombre: string;
  departamento: string;
  id_pais: number;
  pais: string;
}

export interface Persona {
  identificacion: string;
  nombre: string;
  email: string;
  direccion: string;
  rol: string;
  id_ciudad: number;
  ciudad: string;
  departamento: string;
  pais: string;
  telefonos: string[];
  puntos: number | null;
  publicidad: boolean | null;
  comision: number | null;
  experiencia: string | null;
  salario: number | null;
  horario: string | null;
}

export interface Evento {
  codigo: number;
  id_agente: string;
  id_ciudad: number;
  nombre: string;
  descripcion: string;
  teatro: string;
  fecha_inicio: string;
  fecha_fin: string;
  capacidad: number;
  precio: number;
  observaciones: string;
  estado: string;
  causa_cancelacion: string | null;
  agente: string;
  ciudad: string;
  departamento: string;
  pais: string;
  entradas_reservadas: number;
}

export interface Reserva {
  id: number;
  id_cliente: string;
  codigo_evento: number;
  fecha: string;
  entradas: number;
  total: number;
  observaciones: string;
  estado: string;
  causa_cancelacion: string | null;
  cliente: string;
  evento: string;
  ciudad: string;
}

export interface Resumen {
  clientes: number;
  agentes: number;
  administradores: number;
  reservas: number;
  eventos: number;
}

export interface IngresosAgente {
  identificacion: string;
  agente: string;
  reservas: number;
  ingresos_totales: number;
  promedio_por_reserva: number;
}

export interface IngresosCliente {
  identificacion: string;
  cliente: string;
  reservas: number;
  ingresos_totales: number;
  promedio_por_reserva: number;
}

export interface IngresoMes {
  mes: number;
  ingresos: number;
}

export interface ReservasEventoMes {
  codigo: number;
  evento: string;
  mes: number;
  reservas: number;
}

export interface EventosAgenteCiudad {
  agente: string;
  ciudad: string;
  eventos: number;
}

export interface EventoUbicacion {
  pais: string;
  departamento: string;
  ciudad: string;
  codigo: number;
  evento: string;
  estado: string;
}

export interface HistorialReserva {
  id: number;
  id_cliente: string;
  cliente: string;
  evento: string;
  fecha: string;
  entradas: number;
  total: number;
  estado: string;
}

export interface ReservaCancelada {
  id: number;
  cliente: string;
  evento: string;
  causa_cancelacion: string;
}

export interface EventoCancelado {
  codigo: number;
  evento: string;
  agente: string;
  causa_cancelacion: string;
}
