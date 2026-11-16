import { Router } from 'express';
import { ClienteController } from './cliente.controller';

export class ClienteRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ClienteController();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
