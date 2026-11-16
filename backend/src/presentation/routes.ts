import { Router } from 'express';
import { ReporteRoutes } from './modules/administradores/reporte.routes';
import { AdministradorRoutes } from './modules/administradores/administrador.routes';
import { AgenteRoutes } from './modules/agentes/agente.routes';
import { EventoRoutes } from './modules/agentes/evento.routes';
import { AuthRoutes } from './modules/auth/auth.routes';
import { PersonaRoutes } from './modules/auth/persona.routes';
import { ClienteRoutes } from './modules/clientes/cliente.routes';
import { ReservaRoutes } from './modules/clientes/reserva.routes';
import { CiudadRoutes } from './modules/localizacion/ciudad.routes';
import { DepartamentoRoutes } from './modules/localizacion/departamento.routes';
import { PaisRoutes } from './modules/localizacion/pais.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const apiRouter = Router();

    apiRouter.use('/paises', PaisRoutes.routes);
    apiRouter.use('/departamentos', DepartamentoRoutes.routes);
    apiRouter.use('/ciudades', CiudadRoutes.routes);

    apiRouter.use('/auth', AuthRoutes.routes);
    apiRouter.use('/personas', PersonaRoutes.routes);

    apiRouter.use('/clientes', ClienteRoutes.routes);
    apiRouter.use('/reservas', ReservaRoutes.routes);

    apiRouter.use('/agentes', AgenteRoutes.routes);
    apiRouter.use('/eventos', EventoRoutes.routes);

    apiRouter.use('/administradores', AdministradorRoutes.routes);
    apiRouter.use('/reportes', ReporteRoutes.routes);

    router.use('/api', apiRouter);

    return router;
  }
}
