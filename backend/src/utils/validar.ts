import { CustomError } from '../errors/custom.error';

export function validarCampos(body: any, campos: string[]): void {
  const faltantes = campos.filter(
    (campo) => body[campo] === undefined || body[campo] === null || body[campo] === '',
  );

  if (faltantes.length > 0) {
    throw CustomError.badRequest(`Faltan los campos: ${faltantes.join(', ')}`);
  }
}

export function validarId(valor: string | undefined): number {
  const id = Number(valor);

  if (!Number.isInteger(id) || id <= 0) {
    throw CustomError.badRequest('El identificador no es válido');
  }

  return id;
}
