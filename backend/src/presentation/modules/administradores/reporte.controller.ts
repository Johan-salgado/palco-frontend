import { Request, Response } from 'express';
import { HandleError } from '../../../errors/handle.error';
import { ReporteService } from './reporte.service';

export class ReporteController {
  private readonly reporteService = new ReporteService();

  getResumen = (req: Request, res: Response): void => {
    this.reporteService
      .getResumen()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getIngresosPorAgente = (req: Request, res: Response): void => {
    this.reporteService
      .getIngresosPorAgente()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getIngresosPorCliente = (req: Request, res: Response): void => {
    this.reporteService
      .getIngresosPorCliente()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getIngresosPorMes = (req: Request, res: Response): void => {
    this.reporteService
      .getIngresosPorMes()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getReservasPorEventoYMes = (req: Request, res: Response): void => {
    this.reporteService
      .getReservasPorEventoYMes()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getEventosPorAgenteYCiudad = (req: Request, res: Response): void => {
    this.reporteService
      .getEventosPorAgenteYCiudad()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getEventosPorUbicacion = (req: Request, res: Response): void => {
    this.reporteService
      .getEventosPorUbicacion()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getHistorialReservas = (req: Request, res: Response): void => {
    this.reporteService
      .getHistorialReservas(req.query.id_cliente as string | undefined)
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getReservasCanceladas = (req: Request, res: Response): void => {
    this.reporteService
      .getReservasCanceladas()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getEventosCancelados = (req: Request, res: Response): void => {
    this.reporteService
      .getEventosCancelados()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };
}
