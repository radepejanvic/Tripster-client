import { Component, Input } from '@angular/core';
import { AccommodationRequest } from './model/accommodation-request.mode';

@Component({
  selector: 'app-accommodation-request-card',
  templateUrl: './accommodation-request-card.component.html',
  styleUrl: './accommodation-request-card.component.css'
})
export class AccommodationRequestCardComponent {
  amenities:string[];

  ngOnInit(): void {
    this.amenities  = this.accommodation.amenities;
  }

  @Input()
  accommodation:AccommodationRequest;
}
