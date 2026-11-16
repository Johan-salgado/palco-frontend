import { Request, Response } from 'express';
import { HandleError } from '../../../errors/handle.error';
import { ReservaService } from './reserva.service';

export class ReservaController {
  private readonly reservaService = new ReservaService();

  getAll = (req: Request, res: Response): void => {
    this.reservaService
      .getAll()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response): void => {
    this.reservaService
      .getById(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response): void => {
    this.reservaService
      .create(req.body ?? {})
      .then((datos) => res.status(201).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response): void => {
    this.reservaService
      .update(String(req.params.id), req.body ?? {})
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response): void => {
    this.reservaService
      .delete(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getByCliente = (req: Request, res: Response): void => {
    this.reservaService
      .getByCliente(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getByAgente = (req: Request, res: Response): void => {
    this.reservaService
      .getByAgente(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };
}
