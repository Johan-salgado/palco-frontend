import { Router } from 'express';
import { ReporteController } from './reporte.controller';

export class ReporteRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ReporteController();

    router.get('/resumen', controller.getResumen);
    router.get('/ingresos-por-agente', controller.getIngresosPorAgente);
    router.get('/ingresos-por-cliente', controller.getIngresosPorCliente);
    router.get('/ingresos-por-mes', controller.getIngresosPorMes);
    router.get('/reservas-por-evento-mes', controller.getReservasPorEventoYMes);
    router.get('/eventos-por-agente-ciudad', controller.getEventosPorAgenteYCiudad);
    router.get('/eventos-por-ubicacion', controller.getEventosPorUbicacion);
    router.get('/historial-reservas', controller.getHistorialReservas);
    router.get('/reservas-canceladas', controller.getReservasCanceladas);
    router.get('/eventos-cancelados', controller.getEventosCancelados);

    return router;
  }
}
