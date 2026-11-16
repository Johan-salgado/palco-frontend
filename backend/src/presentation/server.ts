import cors from 'cors';
import express, { Router } from 'express';
import { pool } from '../config/database';

export class Server {
  public readonly app = express();

  constructor(
    private readonly port: number,
    private readonly routes: Router,
  ) {}

  async start(): Promise<void> {
    await this.conectarBaseDeDatos();

    this.app.use(cors());
    this.app.use(express.json());

    this.app.get('/', (req, res) => {
      res.json({ mensaje: 'API de Palco funcionando' });
    });

    this.app.use(this.routes);

    this.app.use((req, res) => {
      res.status(404).json({ error: 'Ruta no encontrada' });
    });

    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }

  private async conectarBaseDeDatos(): Promise<void> {
    try {
      await pool.query('SELECT 1');
      console.log('Conexión a PostgreSQL establecida correctamente');
    } catch (error) {
      console.error('Error al conectar con PostgreSQL:', error);
      throw error;
    }
  }
}
