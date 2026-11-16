import { Persona } from '../../../models/persona.model';
import { PersonaService } from '../auth/persona.service';

export class ClienteService {
  private readonly personaService = new PersonaService();

  async getAll(): Promise<Persona[]> {
    return this.personaService.getAll('cliente');
  }

  async getById(id: string): Promise<Persona> {
    return this.personaService.getById(id, 'cliente');
  }

  async create(body: any): Promise<Persona> {
    return this.personaService.create({ ...body, rol: 'cliente' });
  }

  async update(id: string, body: any): Promise<Persona> {
    return this.personaService.update(id, body, 'cliente');
  }

  async delete(id: string): Promise<{ mensaje: string }> {
    return this.personaService.delete(id, 'cliente');
  }
}
