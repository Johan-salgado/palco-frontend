import { Persona } from '../../../models/persona.model';
import { PersonaService } from '../auth/persona.service';

export class AgenteService {
  private readonly personaService = new PersonaService();

  async getAll(): Promise<Persona[]> {
    return this.personaService.getAll('agente');
  }

  async getById(id: string): Promise<Persona> {
    return this.personaService.getById(id, 'agente');
  }

  async create(body: any): Promise<Persona> {
    return this.personaService.create({ ...body, rol: 'agente' });
  }

  async update(id: string, body: any): Promise<Persona> {
    return this.personaService.update(id, body, 'agente');
  }

  async delete(id: string): Promise<{ mensaje: string }> {
    return this.personaService.delete(id, 'agente');
  }
}
