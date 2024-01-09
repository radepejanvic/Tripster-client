import { Component, Input } from '@angular/core';
import { Reservation } from '../guest-reservation-card/model/reservation.model';

@Component({
  selector: 'app-host-reservation-card',
  templateUrl: './host-reservation-card.component.html',
  styleUrl: './host-reservation-card.component.css',
})
export class HostReservationCardComponent {
  @Input()
  reservation: Reservation;

  checkStatus(): boolean {
    return this.reservation.status == 'CANCELLED';
  }
}
