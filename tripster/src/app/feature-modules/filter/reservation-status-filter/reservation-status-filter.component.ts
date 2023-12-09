import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-status-filter',
  templateUrl: './reservation-status-filter.component.html',
  styleUrl: './reservation-status-filter.component.css'
})
export class ReservationStatusFilterComponent {
  reservationStatus: string[] = ['Pending', 'Accepted', 'Cancelled','Denied'];

}
