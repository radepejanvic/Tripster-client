import { Component, Input } from '@angular/core';
import { Review } from '../model/accommodation.model';
import { AuthorizationService } from '../../authorization/authorization.service';
import { ReviewService } from '../review.service';
import { ReportFormComponent } from '../../report/report-form/report-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() review: Review;
  @Input() checked: boolean;

  constructor(private reviewService: ReviewService,
    private authorizationService: AuthorizationService,
    public dialog: MatDialog) { }

  isDeletable(): boolean {
    return this.review.reviewerId == this.authorizationService.getUserId();
  }

  isReportable(): boolean {
    return this.authorizationService.getRole() == 'ROLE_HOST';
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

  openReportFormDialog(): void {
    this.dialog.open(ReportFormComponent, {
      width: '400px',
      data: {
        id: this.review.id,
        type: 'accommodation-review-report'
      }
    });
  }

}
