import { Component, Input, OnInit } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import { UserAccountUpdateService } from '../../user-account-update/user-account-update.service';
import { PersonUpdate } from '../../user-account-update/model/user-update.model';
import { MatDialog } from '@angular/material/dialog';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  @Input() accommodation: Accommodation;

  host!: PersonUpdate;

  constructor(private userService: UserAccountUpdateService, public dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.accommodation.ownerId) {
      console.error('Accommodation doesn`t contain host data.');
      return;
    }

    this.userService.getHost(this.accommodation.ownerId).subscribe({
      next: (response: PersonUpdate) => {
        this.host = response;
        console.log(this.host);
      },
      error: (err: any) => {
        console.error('Error fetching host data.', err);
      }
    });
  }

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

  openReviewFormDialog(): void {
    this.dialog.open(ReviewFormComponent, {
      width: '400px',
      data: {
        id: this.host.id,
        type: 'user-review'
      }
    });
  }


}
