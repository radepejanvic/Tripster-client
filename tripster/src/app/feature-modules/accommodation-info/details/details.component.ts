import { Component, Input } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import { PersonCRUD } from '../../user-registration/model/user.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input() accommodation: Accommodation;
  @Input() owner: PersonCRUD;

  getPricingStrategy(): string {
    return this.accommodation.pricePerNight ? 'price per night' : 'price per guest per night';
  }

  getType(): string {
    switch (this.accommodation.type) {
      case 'APARTMENT': return 'Apartment';
      case 'STUDIO': return 'Studio';
      case 'ROOM': return 'Room';
      default: return 'Unit';
    }
  }


}
