import { Router } from 'express';
import { PersonaController } from './persona.controller';

export class PersonaRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new PersonaController();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
  }
}
