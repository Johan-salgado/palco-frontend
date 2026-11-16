export function mensajeError(error: any): string {
  return error?.error?.error ?? 'No se pudo conectar con el servidor';
}
