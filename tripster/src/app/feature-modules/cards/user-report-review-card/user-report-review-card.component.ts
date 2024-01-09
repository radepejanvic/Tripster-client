import { Component, Input } from '@angular/core';
import { ReviewReport } from '../accommodation-review-report-card/model/review-report.model';

@Component({
  selector: 'app-user-report-review-card',
  templateUrl: './user-report-review-card.component.html',
  styleUrl: './user-report-review-card.component.css',
})
export class UserReportReviewCardComponent {
  @Input()
  review: ReviewReport;
}
