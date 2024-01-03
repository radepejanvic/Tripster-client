import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../model/accommodation.model';
import { AccommodationInfoService } from '../accommodation-info.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { AuthorizationService } from '../../authorization/authorization.service';
import { ReviewService } from '../review.service';
import { InputModalityDetector } from '@angular/cdk/a11y';
import { PersonUpdate } from '../../user-account-update/model/user-update.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  @Input() id!: number;
  @Input() host!: PersonUpdate;
  reviews!: Review[];
  reviewable: boolean = true;
  checked: boolean = false;

  constructor(private accommodationService: AccommodationInfoService,
    private authorizationService: AuthorizationService,
    private reviewService: ReviewService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getAllAccommodationReviews();
    // this.canReviewAccommodation();

  }

  openReviewFormDialog(): void {
    if (this.checked) {

      this.dialog.open(ReviewFormComponent, {
        width: '400px',
        data: {
          id: this.host.userId,
          type: 'user-review'
        }
      });

    } else {
      this.dialog.open(ReviewFormComponent, {
        width: '400px',
        data: {
          id: this.id,
          type: 'accommodation-review'
        }
      });
    }

  }

  getAllAccommodationReviews(): void {
    this.accommodationService.getReviews(this.id).subscribe({
      next: (response: Review[]) => {
        this.reviews = response;

      },
      error: (err: any) => {
        console.error('Failed to load accommodation reviews.', err);
      }
    })
  }

  canReviewAccommodation(): void {
    this.reviewService.canReviewAccommodation(this.id, this.authorizationService.getPersonId()).subscribe({
      next: (response: boolean) => {
        this.reviewable = response;
      },
      error: (err: any) => {
        console.error('Error checking accommodation reviewability.', err);
      }
    });
  }

  getAllHostReviews(): void {
    if (this.host.userId == undefined) {
      console.error('Error fetching host data.');
      return;
    }

    this.reviewService.getHostReviews(this.host.userId).subscribe({
      next: (response: Review[]) => {
        this.reviews = response;

      },
      error: (err: any) => {
        console.error('Failed to load host reviews.', err);
      }
    })
  }

  canReviewHost(): void {
    if (this.host.userId == undefined) {
      console.error('Error fetching host data.');
      return;
    }

    this.reviewService.canReviewHost(this.host.userId, this.authorizationService.getUserId()).subscribe({
      next: (response: boolean) => {
        this.reviewable = response;
      },
      error: (err: any) => {
        console.error('Error checking user reviewability.', err);
      }
    });
  }

  toggleReviews(): void {
    this.reviews = [];

    if (this.checked) {

      this.getAllHostReviews();
      // this.canReviewHost();

    } else {

      this.getAllAccommodationReviews();
      // this.canReviewAccommodation();

    }

  }


}
