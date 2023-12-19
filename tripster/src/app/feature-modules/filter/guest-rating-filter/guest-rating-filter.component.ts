import { Component } from '@angular/core';

@Component({
  selector: 'app-guest-rating-filter',
  templateUrl: './guest-rating-filter.component.html',
  styleUrl: './guest-rating-filter.component.css'
})
export class GuestRatingFilterComponent {
  guestRatings: string[] = ['Any', 'Good', 'Very good','Excellent'];
}
