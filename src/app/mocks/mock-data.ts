import { Evento, Reserva, Usuario } from '../models/models';

export const USUARIOS: Usuario[] = [
  { id: 1, identificacion: '1112345678', nombre: 'Laura Gómez', correo: 'laura.gomez@correo.com', direccion: 'Cra 25 # 10-45', ciudad: 'Tuluá', telefonos: ['3101234567'], rol: 'cliente' },
  { id: 2, identificacion: '1098765432', nombre: 'Andrés Ruiz', correo: 'andres.ruiz@correo.com', direccion: 'Calle 5 # 38-12', ciudad: 'Cali', telefonos: ['3159876543'], rol: 'cliente' },
  { id: 3, identificacion: '1144556677', nombre: 'Camila Torres', correo: 'camila.torres@palco.com', direccion: 'Av. 6N # 23-10', ciudad: 'Cali', telefonos: ['3002223344'], rol: 'agente' },
  { id: 4, identificacion: '1033221100', nombre: 'Felipe Rojas', correo: 'felipe.rojas@palco.com', direccion: 'Cra 7 # 72-30', ciudad: 'Bogotá', telefonos: ['3014445566'], rol: 'agente' },
  { id: 5, identificacion: '1000111222', nombre: 'Mónica Herrera', correo: 'monica.herrera@palco.com', direccion: 'Calle 100 # 15-20', ciudad: 'Bogotá', telefonos: ['3005556677'], rol: 'administrador' },
];

export const EVENTOS: Evento[] = [
  { codigo: 'EV-001', nombre: 'Noche de Salsa Sinfónica', descripcion: 'Orquesta sinfónica y grupo de salsa en un mismo escenario.', teatro: 'Teatro Jorge Isaacs', ciudad: 'Cali', departamento: 'Valle del Cauca', pais: 'Colombia', fechaInicio: '2026-11-21T20:00:00', fechaFin: '2026-11-21T23:00:00', capacidad: 1200, precioBase: 85000, observaciones: 'Apertura de puertas 1 hora antes.', estado: 'En Boletería', agenteId: 3 },
  { codigo: 'EV-002', nombre: 'Hamlet', descripcion: 'Montaje de la Compañía Nacional de Teatro.', teatro: 'Teatro Colón', ciudad: 'Bogotá', departamento: 'Bogotá D.C.', pais: 'Colombia', fechaInicio: '2026-12-05T19:30:00', fechaFin: '2026-12-05T22:00:00', capacidad: 800, precioBase: 120000, observaciones: 'No se permite el ingreso una vez iniciada la función.', estado: 'Programado', agenteId: 4 },
  { codigo: 'EV-003', nombre: 'Stand Up: Risas sin Filtro', descripcion: 'Noche de comedia con cuatro humoristas invitados.', teatro: 'Teatro Municipal de Tuluá', ciudad: 'Tuluá', departamento: 'Valle del Cauca', pais: 'Colombia', fechaInicio: '2026-10-15T20:00:00', fechaFin: '2026-10-15T22:00:00', capacidad: 450, precioBase: 45000, observaciones: 'Recomendado para mayores de 16 años.', estado: 'En Vivo', agenteId: 3 },
  { codigo: 'EV-004', nombre: 'Concierto Filarmónico de Otoño', descripcion: 'Repertorio clásico con la Orquesta Filarmónica.', teatro: 'Teatro Pablo Tobón Uribe', ciudad: 'Medellín', departamento: 'Antioquia', pais: 'Colombia', fechaInicio: '2026-11-14T18:00:00', fechaFin: '2026-11-14T20:30:00', capacidad: 900, precioBase: 95000, observaciones: 'Vestimenta formal sugerida.', estado: 'Programado', agenteId: 4 },
  { codigo: 'EV-005', nombre: 'El Cascanueces', descripcion: 'Ballet clásico en dos actos.', teatro: 'Teatro Municipal Enrique Buenaventura', ciudad: 'Cali', departamento: 'Valle del Cauca', pais: 'Colombia', fechaInicio: '2026-08-22T17:00:00', fechaFin: '2026-08-22T19:30:00', capacidad: 700, precioBase: 70000, observaciones: 'Función familiar.', estado: 'Finalizado', agenteId: 3 },
  { codigo: 'EV-006', nombre: 'Gira Reggae Roots', descripcion: 'Tres bandas de reggae en una sola noche.', teatro: 'Teatro Santander', ciudad: 'Bucaramanga', departamento: 'Santander', pais: 'Colombia', fechaInicio: '2026-09-12T19:00:00', fechaFin: '2026-09-12T23:00:00', capacidad: 1000, precioBase: 60000, observaciones: 'Evento cancelado.', estado: 'Cancelado', agenteId: 4, causaCancelacion: 'Cierre del escenario por mantenimiento' },
];

export const RESERVAS: Reserva[] = [
  { id: 1, eventoCodigo: 'EV-001', clienteId: 1, fechaReserva: '2026-10-02T10:15:00', numEntradas: 2, valorTotal: 170000, observaciones: 'Silletería central', estado: 'Confirmada' },
  { id: 2, eventoCodigo: 'EV-001', clienteId: 2, fechaReserva: '2026-10-05T16:40:00', numEntradas: 4, valorTotal: 340000, observaciones: '', estado: 'Reservada' },
  { id: 3, eventoCodigo: 'EV-002', clienteId: 1, fechaReserva: '2026-10-08T09:05:00', numEntradas: 2, valorTotal: 240000, observaciones: 'Cerca al pasillo', estado: 'Reservada' },
  { id: 4, eventoCodigo: 'EV-003', clienteId: 2, fechaReserva: '2026-10-10T12:30:00', numEntradas: 3, valorTotal: 135000, observaciones: '', estado: 'Confirmada' },
  { id: 5, eventoCodigo: 'EV-004', clienteId: 1, fechaReserva: '2026-10-11T18:20:00', numEntradas: 1, valorTotal: 95000, observaciones: '', estado: 'Cancelada', causaCancelacion: 'El cliente no pudo asistir' },
  { id: 6, eventoCodigo: 'EV-005', clienteId: 2, fechaReserva: '2026-07-30T11:00:00', numEntradas: 2, valorTotal: 140000, observaciones: '', estado: 'Confirmada' },
  { id: 7, eventoCodigo: 'EV-006', clienteId: 1, fechaReserva: '2026-08-20T15:10:00', numEntradas: 2, valorTotal: 120000, observaciones: '', estado: 'Cancelada', causaCancelacion: 'Evento cancelado por el organizador' },
  { id: 8, eventoCodigo: 'EV-002', clienteId: 2, fechaReserva: '2026-10-12T19:45:00', numEntradas: 5, valorTotal: 600000, observaciones: 'Grupo familiar', estado: 'Confirmada' },
];

export const INGRESOS_POR_MES = [
  { mes: 'Ene', valor: 4200000 },
  { mes: 'Feb', valor: 3100000 },
  { mes: 'Mar', valor: 5600000 },
  { mes: 'Abr', valor: 4800000 },
  { mes: 'May', valor: 6900000 },
  { mes: 'Jun', valor: 7400000 },
  { mes: 'Jul', valor: 5200000 },
  { mes: 'Ago', valor: 6100000 },
  { mes: 'Sep', valor: 3800000 },
  { mes: 'Oct', valor: 8300000 },
];
