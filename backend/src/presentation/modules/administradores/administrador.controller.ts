import { Request, Response } from 'express';
import { HandleError } from '../../../errors/handle.error';
import { AdministradorService } from './administrador.service';

export class AdministradorController {
  private readonly administradorService = new AdministradorService();

  getAll = (req: Request, res: Response): void => {
    this.administradorService
      .getAll()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response): void => {
    this.administradorService
      .getById(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response): void => {
    this.administradorService
      .create(req.body ?? {})
      .then((datos) => res.status(201).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response): void => {
    this.administradorService
      .update(String(req.params.id), req.body ?? {})
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response): void => {
    this.administradorService
      .delete(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };
}
