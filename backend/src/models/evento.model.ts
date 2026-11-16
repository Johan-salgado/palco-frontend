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
