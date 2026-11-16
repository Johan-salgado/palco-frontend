import { Persona } from '../../../models/persona.model';
import { PersonaService } from '../auth/persona.service';

export class AdministradorService {
  private readonly personaService = new PersonaService();

  async getAll(): Promise<Persona[]> {
    return this.personaService.getAll('administrador');
  }

  async getById(id: string): Promise<Persona> {
    return this.personaService.getById(id, 'administrador');
  }

  async create(body: any): Promise<Persona> {
    return this.personaService.create({ ...body, rol: 'administrador' });
  }

  async update(id: string, body: any): Promise<Persona> {
    return this.personaService.update(id, body, 'administrador');
  }

  async delete(id: string): Promise<{ mensaje: string }> {
    return this.personaService.delete(id, 'administrador');
  }
}
