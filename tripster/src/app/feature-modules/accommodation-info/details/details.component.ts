import { Component, Input, OnInit } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import { UserAccountUpdateService } from '../../user-account-update/user-account-update.service';
import { PersonUpdate } from '../../user-account-update/model/user-update.model';
import { MatDialog } from '@angular/material/dialog';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { ReviewService } from '../review.service';
import { AuthorizationService } from '../../authorization/authorization.service';
import { ReportFormComponent } from '../../report/report-form/report-form.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() accommodation: Accommodation;
  @Input() host: PersonUpdate;

  constructor(private userService: UserAccountUpdateService,
    private reviewService: ReviewService,
    private authorizationService: AuthorizationService,
    public dialog: MatDialog) { }

  getPricingStrategy(): string {
    return this.accommodation.pricePerNight ? 'price per night' : 'price per guest per night';
  }

  getType(): string {
    switch (this.accommodation.type) {
      case 'APARTMENT': return 'Apartment';
      case 'STUDIO': return 'Studio';
      case 'ROOM': return 'Room';
      default: return 'Unit';
    }
  }

  openReportFormDialog(): void {
    this.dialog.open(ReportFormComponent, {
      width: '400px',
      data: {
        id: this.host.userId,
        type: 'host-report'
      }
    });
  }

}
