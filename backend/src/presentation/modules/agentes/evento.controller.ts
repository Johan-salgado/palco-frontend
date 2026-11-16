import { Request, Response } from 'express';
import { HandleError } from '../../../errors/handle.error';
import { EventoService } from './evento.service';

export class EventoController {
  private readonly eventoService = new EventoService();

  getAll = (req: Request, res: Response): void => {
    this.eventoService
      .getAll()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response): void => {
    this.eventoService
      .getById(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response): void => {
    this.eventoService
      .create(req.body ?? {})
      .then((datos) => res.status(201).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response): void => {
    this.eventoService
      .update(String(req.params.id), req.body ?? {})
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response): void => {
    this.eventoService
      .delete(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getDisponibles = (req: Request, res: Response): void => {
    this.eventoService
      .getDisponibles()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getByAgente = (req: Request, res: Response): void => {
    this.eventoService
      .getByAgente(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };
}
