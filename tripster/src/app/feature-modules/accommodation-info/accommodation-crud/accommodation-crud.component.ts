import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';

@Component({
  selector: 'app-accommodation-crud',
  templateUrl: './accommodation-crud.component.html',
  styleUrl: './accommodation-crud.component.css'
})
export class AccommodationCrudComponent implements OnInit {
  amenities: string[] = [];
  checkedAmenities: boolean[] = [];

  accommodation: Accommodation = {
    status: '',
    name: '',
    shortDescription: '',
    minCap: 0,
    maxCap: 0,
    type: '',
    automaticReservation: true,
    country: '',
    city: '',
    zipCode: '',
    street: '',
    number: '',
    latitude: 0,
    longitude: 0,
    description: '',
    amenities: [],
    cancelDuration: 0,
    pricePerNight: true
  };

  ngOnInit(): void {

    for (let i = 0; i < 30; i++) {
      this.amenities.push("Some amenity");
    }
    this.checkedAmenities = new Array(this.amenities.length).fill(false);
  }

  toggleAmenity(event: any, index: number): void {
    this.checkedAmenities[index] = event.target.checked;
  }

  formatAddress(): string {
    return `${this.accommodation.street} ${this.accommodation.number}, ${this.accommodation.city}, ${this.accommodation.country}`;
  }

  checkData() {
    console.log(this.accommodation);
  }


}
