import { Router } from 'express';
import { DepartamentoController } from './departamento.controller';

export class DepartamentoRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new DepartamentoController();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
