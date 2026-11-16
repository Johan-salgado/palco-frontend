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
