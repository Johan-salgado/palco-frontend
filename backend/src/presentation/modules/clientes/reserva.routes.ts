import { Router } from 'express';
import { ReservaController } from './reserva.controller';

export class ReservaRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ReservaController();

    router.get('/cliente/:id', controller.getByCliente);
    router.get('/agente/:id', controller.getByAgente);
    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
