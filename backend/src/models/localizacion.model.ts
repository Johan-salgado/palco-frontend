export interface Pais {
  id: number;
  nombre: string;
}

export interface Departamento {
  id: number;
  id_pais: number;
  nombre: string;
  pais?: string;
}

export interface Ciudad {
  id: number;
  id_departamento: number;
  nombre: string;
  departamento?: string;
  id_pais?: number;
  pais?: string;
}
