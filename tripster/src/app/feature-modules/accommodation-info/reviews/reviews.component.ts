import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../model/accommodation.model';
import { AccommodationInfoService } from '../accommodation-info.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { AuthorizationService } from '../../authorization/authorization.service';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  @Input() id!: number;
  reviews!: Review[];
  reviewable: boolean = false;

  constructor(private accommodationService: AccommodationInfoService,
    private authorizationService: AuthorizationService,
    private reviewService: ReviewService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.accommodationService.getReviews(this.id).subscribe({
      next: (response: Review[]) => {
        this.reviews = response;

      },
      error: (err: any) => {
        console.error('Failed to load reviews.', err);
      }
    })

    this.reviewService.canReviewAccommodation(this.id, this.authorizationService.getPersonId()).subscribe({
      next: (response: boolean) => {
        this.reviewable = response;
      },
      error: (err: any) => {
        console.error('Error checking accommodation reviewability.', err);
      }
    });

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

}
