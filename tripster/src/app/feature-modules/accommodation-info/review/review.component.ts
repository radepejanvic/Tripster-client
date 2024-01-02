import { Component, Input } from '@angular/core';
import { Review } from '../model/accommodation.model';
import { AuthorizationService } from '../../authorization/authorization.service';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() review: Review;
  @Input() checked: boolean;

  constructor(private reviewService: ReviewService,
    private authorizationService: AuthorizationService) { }

  isDeletable(): boolean {
    return this.review.reviewerId == this.authorizationService.getUserId();
  }

  isReportable(): boolean {
    return false;
  }

  deleteReview(): void {

    if (!this.review.id) {
      console.log('Error finding review id.');
      return;
    }

    if (this.checked) {
      this.reviewService.deleteHostReview(this.review.id).subscribe({
        next: (response: boolean) => {
          console.log('Succesfully deleted.');
        },
        error: (err: any) => {
          console.error('Failed to delete host review.', err);
        }
      });
    } else {
      this.reviewService.deleteAccommodationReview(this.review.id).subscribe({
        next: (response: boolean) => {
          console.log('Succesfully deleted.');
        },
        error: (err: any) => {
          console.error('Failed to delete accommodation review.', err);
        }
      });
    }


  }

}
