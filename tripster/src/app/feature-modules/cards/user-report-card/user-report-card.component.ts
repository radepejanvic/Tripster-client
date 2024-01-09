import { Component, Input } from '@angular/core';
import { ReviewReport } from '../accommodation-review-report-card/model/review-report.model';
import { CardService } from '../card.service';
import { Review } from '../../accommodation-info/model/accommodation.model';
import { Report } from '../../report/model/report.model';

@Component({
  selector: 'app-user-report-card',
  templateUrl: './user-report-card.component.html',
  styleUrl: './user-report-card.component.css',
})
export class UserReportCardComponent {
  @Input()
  report: Report;

  // constructor(private service: CardService) {}

  // delete() {
  //   this.service.deletedAccommodationReportReview(this.review.id || 0);
  // }

  // approve() {
  //   this.service.approveAccommodationReportReview(this.review.id || 0);
  // }
}
