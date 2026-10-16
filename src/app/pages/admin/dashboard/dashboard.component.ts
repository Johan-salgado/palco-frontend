import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReporteService } from '../../../services/reporte.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private reporteService = inject(ReporteService);

  resumen = this.reporteService.getResumen();
  ingresos = this.reporteService.getIngresosPorMes();
  reservasPorEvento = this.reporteService.getReservasPorEvento();
  eventosPorAgente = this.reporteService.getEventosPorAgente();
  eventosCancelados = this.reporteService.getEventosCancelados();
  reservasCanceladas = this.reporteService.getReservasCanceladas();

  maxIngreso = Math.max(...this.ingresos.map((i) => i.valor));
  maxReservas = Math.max(...this.reservasPorEvento.map((r) => r.reservas));
  totalIngresos = this.ingresos.reduce((suma, i) => suma + i.valor, 0);
}
