import { Component, Input } from '@angular/core';
import { Review } from '../../accommodation-info/model/accommodation.model';
import { CardService } from '../card.service';
import { ReviewReport } from './model/review-report.model';

@Component({
  selector: 'app-accommodation-review-report-card',
  templateUrl: './accommodation-review-report-card.component.html',
  styleUrl: './accommodation-review-report-card.component.css',
})
export class AccommodationReviewReportCardComponent {
  @Input()
  review: ReviewReport;

  constructor(private service: CardService) {}

  delete() {
    this.service.deletedAccommodationReportReview(this.review.id || 0);
  }

  approve() {
    this.service.approveAccommodationReportReview(this.review.id || 0);
  }
}
