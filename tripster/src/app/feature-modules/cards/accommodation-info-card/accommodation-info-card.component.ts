import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-info-card',
  templateUrl: './accommodation-info-card.component.html',
  styleUrl: './accommodation-info-card.component.css'
})
export class AccommodationInfoCardComponent {
  amenities:string[]=['wifi',"parking"]
}
