import { Component, Input } from '@angular/core';
import { ReviewReport } from '../accommodation-review-report-card/model/review-report.model';
import { CardService } from '../card.service';

@Component({
  selector: 'app-user-report-review-card',
  templateUrl: './user-report-review-card.component.html',
  styleUrl: './user-report-review-card.component.css',
})
export class UserReportReviewCardComponent {
  @Input()
  review: ReviewReport;

  constructor(private service: CardService) {}

  delete() {
    this.service.deletedUserReportReview(this.review.id || 0).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  approve() {
    this.service.approveUserReportReview(this.review.id || 0).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
