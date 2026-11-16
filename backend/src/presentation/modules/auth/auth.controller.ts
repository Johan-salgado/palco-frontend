import { Request, Response } from 'express';
import { HandleError } from '../../../errors/handle.error';
import { AuthService } from './auth.service';

export class AuthController {
  private readonly authService = new AuthService();

  login = (req: Request, res: Response): void => {
    this.authService
      .login(req.body ?? {})
      .then((persona) => res.status(200).json(persona))
      .catch((error) => HandleError.error(error, res));
  };

  registro = (req: Request, res: Response): void => {
    this.authService
      .registro(req.body ?? {})
      .then((persona) => res.status(201).json(persona))
      .catch((error) => HandleError.error(error, res));
  };
}
