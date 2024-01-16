import { Component, Input } from '@angular/core';
import { AccommodationInfoCard } from '../accommodation-info-card/model/accommodation-info-card.model';
import { Reservation } from './model/reservation.model';
import { CardService } from '../card.service';

@Component({
  selector: 'app-guest-reservation-card',
  templateUrl: './guest-reservation-card.component.html',
  styleUrl: './guest-reservation-card.component.css',
})
export class GuestReservationCardComponent {
  @Input()
  reservation: Reservation;
  constructor(private service: CardService) {}

  checkStatus(): boolean {
    return this.reservation.status == 'CANCELLED';
  }

  deleteReservation() {
    this.service.deleteReservation(this.reservation.id || 0).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
