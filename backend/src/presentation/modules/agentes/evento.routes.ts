import { Router } from 'express';
import { EventoController } from './evento.controller';

export class EventoRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new EventoController();

    router.get('/disponibles', controller.getDisponibles);
    router.get('/agente/:id', controller.getByAgente);
    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
