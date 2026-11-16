import { Request, Response } from 'express';
import { HandleError } from '../../../errors/handle.error';
import { PersonaService } from './persona.service';

export class PersonaController {
  private readonly personaService = new PersonaService();

  getAll = (req: Request, res: Response): void => {
    this.personaService
      .getAll(req.query.rol as string | undefined)
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  getById = (req: Request, res: Response): void => {
    this.personaService
      .getById(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  create = (req: Request, res: Response): void => {
    this.personaService
      .create(req.body ?? {})
      .then((datos) => res.status(201).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  update = (req: Request, res: Response): void => {
    this.personaService
      .update(String(req.params.id), req.body ?? {})
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };

  delete = (req: Request, res: Response): void => {
    this.personaService
      .delete(String(req.params.id))
      .then((datos) => res.status(200).json(datos))
      .catch((error) => HandleError.error(error, res));
  };
}
