import { Component, Input } from '@angular/core';
import { Review } from '../../accommodation-info/model/accommodation.model';
import { CardService } from '../card.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-accommodation-review-card',
  templateUrl: './accommodation-review-card.component.html',
  styleUrl: './accommodation-review-card.component.css',
})
export class AccommodationReviewCardComponent {
  @Input()
  review: Review;

  constructor(private service: CardService) {}

  approvee() {
    this.service.approveAccommodationReview(this.review.id || 0).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    window.location.reload();
  }
  delete() {
    this.service.deletedAccommodationReview(this.review.id || 0).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
