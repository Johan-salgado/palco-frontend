import { Router } from 'express';
import { CiudadController } from './ciudad.controller';

export class CiudadRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new CiudadController();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
