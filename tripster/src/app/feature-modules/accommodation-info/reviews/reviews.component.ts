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
  reviewable: boolean = false;
  checked: boolean = false;

  constructor(private accommodationService: AccommodationInfoService,
    private authorizationService: AuthorizationService,
    private reviewService: ReviewService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getAllAccommodationReviews();
    this.canReviewAccommodation();

  }

  openReviewFormDialog(): void {
    this.dialog.open(ReviewFormComponent, {
      width: '400px',
      data: {
        id: this.id,
        type: 'accommodation-review'
      }
    });
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
    this.reviewService.getHostReviews(this.id).subscribe({
      next: (response: Review[]) => {
        this.reviews = response;

      },
      error: (err: any) => {
        console.error('Failed to load host reviews.', err);
      }
    })
  }

  canReviewHost(): void {
    this.reviewService.canReviewHost(this.host.id, this.authorizationService.getPersonId()).subscribe({
      next: (response: boolean) => {
        this.reviewable = response;
      },
      error: (err: any) => {
        console.error('Error checking user reviewability.', err);
      }
    });
  }

  toggleReviews(): void {
    if (this.checked) {

      this.getAllHostReviews();
      this.canReviewHost();

    } else {

      this.getAllAccommodationReviews();
      this.canReviewAccommodation();

    }

  }


}
