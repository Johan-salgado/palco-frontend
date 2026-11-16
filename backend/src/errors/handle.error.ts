import { Response } from 'express';
import { CustomError } from './custom.error';

export class HandleError {
  static error(error: unknown, res: Response) {
    console.log(`${error}`);

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    const codigo = (error as { code?: string }).code;

    if (codigo === '23505') {
      return res.status(409).json({ error: 'Ya existe un registro con esos datos' });
    }

    if (codigo === '23503') {
      return res.status(409).json({
        error: 'No se pudo completar la operación: el registro tiene datos relacionados o hace referencia a datos que no existen',
      });
    }

    if (codigo === '23514') {
      return res.status(400).json({ error: 'Hay un dato con un valor no permitido' });
    }

    if (codigo === '22P02' || codigo === '22007' || codigo === '22008') {
      return res.status(400).json({ error: 'Hay un dato con un formato inválido' });
    }

    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
