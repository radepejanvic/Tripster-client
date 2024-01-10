import { Component, Input, OnInit } from '@angular/core';
import { Rating } from '../model/accommodation.model';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-rating-stats',
  templateUrl: './rating-stats.component.html',
  styleUrl: './rating-stats.component.css'
})
export class RatingStatsComponent implements OnInit {
  @Input() id: number;
  stats: Rating;
  max: number = 0;

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.reviewService.getRatingStats(this.id).subscribe({
      next: (response: Rating) => {
        this.stats = response;
        this.setMax();
        console.log('Fetched rating stats: ', response);
      },
      error: (err: any) => {
        console.error('Error fetching rating stats.', err);
      }
    })
  }

  getRateName(): string {
    switch (Math.ceil(this.stats.rating)) {
      case 1: return 'Bad';
      case 2: return 'Poor';
      case 3: return 'Average';
      case 4: return 'Good';
      case 5: return 'Excellent';
      default: return '';
    }
  }

  calculateProgress(progress: number): number {
    return this.max != 0 ? progress / this.max * 100 : 0;
  }

  setMax(): void {
    let array: number[] = [];
    array.push(this.stats.bad);
    array.push(this.stats.poor);
    array.push(this.stats.average);
    array.push(this.stats.good);
    array.push(this.stats.excellent);

    this.max = Math.max(...array);
  }

}
