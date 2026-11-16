import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Ciudad } from '../../../models/models';
import { AuthService } from '../../../services/auth.service';
import { LocalizacionService } from '../../../services/localizacion.service';
import { mensajeError } from '../../../utils/mensajes';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent implements OnInit {
  private authService = inject(AuthService);
  private localizacionService = inject(LocalizacionService);
  private router = inject(Router);

  ciudades: Ciudad[] = [];
  mensaje = '';
  error = '';

  persona = {
    rol: 'cliente',
    identificacion: '',
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    id_ciudad: null as number | null,
    experiencia: '',
    clave: '',
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
  }

  registrar() {
    this.mensaje = '';
    this.error = '';

    const datos = {
      rol: this.persona.rol,
      identificacion: this.persona.identificacion,
      nombre: this.persona.nombre,
      email: this.persona.email,
      clave: this.persona.clave,
      direccion: this.persona.direccion,
      id_ciudad: this.persona.id_ciudad,
      telefonos: this.persona.telefono ? [this.persona.telefono] : [],
      experiencia: this.persona.experiencia,
    };

    this.authService.registro(datos).subscribe({
      next: () => {
        this.mensaje = 'Cuenta creada correctamente. Ahora puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.error = mensajeError(err);
      },
    });
  }
}
