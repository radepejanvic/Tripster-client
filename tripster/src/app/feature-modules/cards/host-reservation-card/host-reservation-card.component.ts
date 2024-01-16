import { Component, Input } from '@angular/core';
import { Reservation } from '../guest-reservation-card/model/reservation.model';
import { MatDialog } from '@angular/material/dialog';
import { ReportFormComponent } from '../../report/report-form/report-form.component';
import { CardService } from '../card.service';

@Component({
  selector: 'app-host-reservation-card',
  templateUrl: './host-reservation-card.component.html',
  styleUrl: './host-reservation-card.component.css',
})
export class HostReservationCardComponent {
  @Input()
  reservation: Reservation;
  constructor(public dialog: MatDialog, private service: CardService) {}

  checkStatus(): boolean {
    return this.reservation.status == 'CANCELLED';
  }

  openReportFormDialog(): void {
    this.dialog.open(ReportFormComponent, {
      width: '400px',
      data: {
        id: this.reservation.userID,
        type: 'guest-report',
      },
    });
  }

  rejectReservation() {
    this.service.rejectReservation(this.reservation.id || 0).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  acceptReservation() {
    this.service.acceptReservation(this.reservation.id || 0).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
