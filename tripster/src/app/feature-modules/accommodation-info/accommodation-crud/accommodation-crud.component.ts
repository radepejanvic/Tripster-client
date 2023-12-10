import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodation-crud',
  templateUrl: './accommodation-crud.component.html',
  styleUrl: './accommodation-crud.component.css'
})
export class AccommodationCrudComponent implements OnInit {
  amenities: string[] = [];
  checkedAmenities: boolean[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 12; i++) {
      this.amenities.push("Some amenity");
    }
    this.checkedAmenities = new Array(this.amenities.length).fill(false);
  }

  toggleAmenity(event: any, index: number): void {
    this.checkedAmenities[index] = event.target.checked;
  }


}
