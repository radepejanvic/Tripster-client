import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../model/accommodation.model';
import { AccommodationInfoService } from '../accommodation-info.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  @Input() id!: number;
  reviews!: Review[];

  constructor(private accommodationService: AccommodationInfoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.accommodationService.getReviews(this.id).subscribe({
      next: (response: Review[]) => {
        this.reviews = response;

      },
      error: (err: any) => {
        console.error('Failed to load reviews.', err);
      }
    })
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
