import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  EventoCancelado,
  EventosAgenteCiudad,
  EventoUbicacion,
  HistorialReserva,
  IngresoMes,
  IngresosAgente,
  IngresosCliente,
  ReservaCancelada,
  ReservasEventoMes,
  Resumen,
} from '../../../models/models';
import { ReporteService } from '../../../services/reporte.service';
import { EstadoBadgeComponent } from '../../../shared/estado-badge/estado-badge.component';
import { mensajeError } from '../../../utils/mensajes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, DecimalPipe, FormsModule, EstadoBadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private reporteService = inject(ReporteService);

  meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  resumen: Resumen | null = null;
  ingresosMes: IngresoMes[] = [];
  reservasEventoMes: ReservasEventoMes[] = [];
  ingresosAgentes: IngresosAgente[] = [];
  ingresosClientes: IngresosCliente[] = [];
  eventosAgenteCiudad: EventosAgenteCiudad[] = [];
  eventosUbicacion: EventoUbicacion[] = [];
  historial: HistorialReserva[] = [];
  reservasCanceladas: ReservaCancelada[] = [];
  eventosCancelados: EventoCancelado[] = [];

  clienteSeleccionado = '';
  maxIngreso = 1;
  totalIngresos = 0;
  error = '';

  private alFallar = (err: any) => {
    this.error = mensajeError(err);
  };

  ngOnInit() {
    this.reporteService.getResumen().subscribe({
      next: (datos) => (this.resumen = datos),
      error: this.alFallar,
    });

    this.reporteService.getIngresosPorMes().subscribe({
      next: (datos) => {
        this.ingresosMes = datos;
        this.maxIngreso = Math.max(...datos.map((i) => i.ingresos), 1);
        this.totalIngresos = datos.reduce((suma, i) => suma + i.ingresos, 0);
      },
      error: this.alFallar,
    });

    this.reporteService.getReservasPorEventoYMes().subscribe({
      next: (datos) => (this.reservasEventoMes = datos),
      error: this.alFallar,
    });

    this.reporteService.getIngresosPorAgente().subscribe({
      next: (datos) => (this.ingresosAgentes = datos),
      error: this.alFallar,
    });

    this.reporteService.getIngresosPorCliente().subscribe({
      next: (datos) => {
        this.ingresosClientes = datos;

        if (datos.length > 0) {
          this.clienteSeleccionado = datos[0].identificacion;
          this.cargarHistorial();
        }
      },
      error: this.alFallar,
    });

    this.reporteService.getEventosPorAgenteYCiudad().subscribe({
      next: (datos) => (this.eventosAgenteCiudad = datos),
      error: this.alFallar,
    });

    this.reporteService.getEventosPorUbicacion().subscribe({
      next: (datos) => (this.eventosUbicacion = datos),
      error: this.alFallar,
    });

    this.reporteService.getReservasCanceladas().subscribe({
      next: (datos) => (this.reservasCanceladas = datos),
      error: this.alFallar,
    });

    this.reporteService.getEventosCancelados().subscribe({
      next: (datos) => (this.eventosCancelados = datos),
      error: this.alFallar,
    });
  }

  cargarHistorial() {
    this.reporteService.getHistorialReservas(this.clienteSeleccionado).subscribe({
      next: (datos) => (this.historial = datos),
      error: this.alFallar,
    });
  }
}
