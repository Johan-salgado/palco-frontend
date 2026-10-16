export interface Usuario {
  id: number;
  identificacion: string;
  nombre: string;
  correo: string;
  direccion: string;
  ciudad: string;
  telefonos: string[];
  rol: string;
}

export interface Evento {
  codigo: string;
  nombre: string;
  descripcion: string;
  teatro: string;
  ciudad: string;
  departamento: string;
  pais: string;
  fechaInicio: string;
  fechaFin: string;
  capacidad: number;
  precioBase: number;
  observaciones: string;
  estado: string;
  agenteId: number;
  causaCancelacion?: string;
}

export interface Reserva {
  id: number;
  eventoCodigo: string;
  clienteId: number;
  fechaReserva: string;
  numEntradas: number;
  valorTotal: number;
  observaciones: string;
  estado: string;
  causaCancelacion?: string;
}

export interface ReservaDetalle extends Reserva {
  nombreEvento: string;
  ciudad: string;
  nombreCliente: string;
}
