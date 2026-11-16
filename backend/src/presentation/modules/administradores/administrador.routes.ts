import { Router } from 'express';
import { AdministradorController } from './administrador.controller';

export class AdministradorRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AdministradorController();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
