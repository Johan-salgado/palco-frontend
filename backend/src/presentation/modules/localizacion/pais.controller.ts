import { Request, Response } from 'express';
import { HandleError } from '../../../errors/handle.error';
import { PaisService } from './pais.service';

export class PaisController {
  private readonly paisService = new PaisService();

  getAll = (req: Request, res: Response): void => {
    this.paisService
      .getAll()
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response): void => {
    this.paisService
      .getById(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response): void => {
    this.paisService
      .create(req.body ?? {})
      .then((datos) => res.status(201).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response): void => {
    this.paisService
      .update(String(req.params.id), req.body ?? {})
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response): void => {
    this.paisService
      .delete(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };
}
