import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../model/accommodation.model';
import { AccommodationInfoService } from '../accommodation-info.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  @Input() id!: number;
  reviews!: Review[];

  constructor(private accommodationService: AccommodationInfoService) { }

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

}
