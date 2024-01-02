import { Component, Input, OnInit } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import { UserAccountUpdateService } from '../../user-account-update/user-account-update.service';
import { PersonUpdate } from '../../user-account-update/model/user-update.model';
import { MatDialog } from '@angular/material/dialog';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { ReviewService } from '../review.service';
import { AuthorizationService } from '../../authorization/authorization.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  @Input() accommodation: Accommodation;
  @Input() host: PersonUpdate;
  reviewable: boolean = false;

  constructor(private userService: UserAccountUpdateService,
    private reviewService: ReviewService,
    private authorizationService: AuthorizationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.setReviewable();

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


  setReviewable(): void {
    this.reviewService.canReviewHost(this.host.id, this.authorizationService.getPersonId()).subscribe({
      next: (response: boolean) => {
        this.reviewable = response;
      },
      error: (err: any) => {
        console.error('Error checking user reviewability.', err);
      }
    });
  }

}
