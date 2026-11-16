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
