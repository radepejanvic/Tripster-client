import { Component, Input } from '@angular/core';
import { AccommodationInfoCard } from '../accommodation-info-card/model/accommodation-info-card.model';
import { Reservation } from './model/reservation.model';

@Component({
  selector: 'app-guest-reservation-card',
  templateUrl: './guest-reservation-card.component.html',
  styleUrl: './guest-reservation-card.component.css',
})
export class GuestReservationCardComponent {
  @Input()
  reservation: Reservation;

  checkStatus(): boolean {
    return this.reservation.status == 'CANCELLED';
  }
}
