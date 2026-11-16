import { Router } from 'express';
import { PaisController } from './pais.controller';

export class PaisRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PaisController();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
