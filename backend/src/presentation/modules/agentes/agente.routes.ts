import { Router } from 'express';
import { AgenteController } from './agente.controller';

export class AgenteRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AgenteController();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
