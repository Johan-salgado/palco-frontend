import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ciudad } from '../../../models/models';
import { AuthService } from '../../../services/auth.service';
import { EventoService } from '../../../services/evento.service';
import { LocalizacionService } from '../../../services/localizacion.service';
import { mensajeError } from '../../../utils/mensajes';

@Component({
  selector: 'app-registrar-evento',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registrar-evento.component.html',
  styleUrl: './registrar-evento.component.scss',
})
export class RegistrarEventoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private eventoService = inject(EventoService);
  private localizacionService = inject(LocalizacionService);

  estados = ['Programado', 'En Boletería', 'En Vivo', 'Finalizado', 'Cancelado'];
  ciudades: Ciudad[] = [];
  codigo: number | null = null;
  error = '';

  evento = {
    nombre: '',
    descripcion: '',
    teatro: '',
    id_ciudad: null as number | null,
    fecha_inicio: '',
    fecha_fin: '',
    capacidad: null as number | null,
    precio: null as number | null,
    observaciones: '',
    estado: 'Programado',
    causa_cancelacion: '',
  };

  ngOnInit() {
    this.localizacionService.getCiudades().subscribe({
      next: (ciudades) => {
        this.ciudades = ciudades;
      },
      error: (err) => {
        this.error = mensajeError(err);
      },
    });

    const parametro = this.route.snapshot.paramMap.get('codigo');

    if (parametro) {
      this.codigo = Number(parametro);
      this.cargarEvento(this.codigo);
    }
  }

  cargarEvento(codigo: number) {
    this.eventoService.getEvento(codigo).subscribe({
      next: (evento) => {
        this.evento = {
          nombre: evento.nombre,
          descripcion: evento.descripcion,
          teatro: evento.teatro,
          id_ciudad: evento.id_ciudad,
          fecha_inicio: evento.fecha_inicio.slice(0, 16),
          fecha_fin: evento.fecha_fin.slice(0, 16),
          capacidad: evento.capacidad,
          precio: evento.precio,
          observaciones: evento.observaciones,
          estado: evento.estado,
          causa_cancelacion: evento.causa_cancelacion ?? '',
        };
      },
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }

  guardar() {
    const usuario = this.authService.getUsuario();

    if (!usuario) {
      return;
    }

    this.error = '';

    const datos = { ...this.evento, id_agente: usuario.identificacion };

    const respuesta = {
      next: () => {
        this.router.navigate(['/agente/eventos']);
      },
      error: (err: any) => {
        this.error = mensajeError(err);
      },
    };

    if (this.codigo) {
      this.eventoService.actualizar(this.codigo, datos).subscribe(respuesta);
    } else {
      this.eventoService.crear(datos).subscribe(respuesta);
    }
  }
}
