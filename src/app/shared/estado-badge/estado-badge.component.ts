import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estado-badge',
  standalone: true,
  templateUrl: './estado-badge.component.html',
})
export class EstadoBadgeComponent {
  @Input() estado = '';

  get clase(): string {
    switch (this.estado) {
      case 'Programado':
        return 'text-bg-secondary';
      case 'En Boletería':
        return 'text-bg-info';
      case 'En Vivo':
      case 'Confirmada':
        return 'text-bg-success';
      case 'Finalizado':
        return 'text-bg-dark';
      case 'Reservada':
        return 'text-bg-warning';
      default:
        return 'text-bg-danger';
    }
  }
}
