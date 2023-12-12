import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccommodationInfoService } from '../accommodation-info.service';

@Component({
  selector: 'app-accommodation-crud',
  templateUrl: './accommodation-crud.component.html',
  styleUrl: './accommodation-crud.component.css'
})
export class AccommodationCrudComponent implements OnInit {
  amenities: string[] = [];
  checkedAmenities: boolean[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required]),
    minCap: new FormControl(0, [Validators.required]),
    maxCap: new FormControl(0, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    automaticReservation: new FormControl(true, [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    latitude: new FormControl(0, [Validators.required]),
    longitude: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    cancelDuration: new FormControl(0, [Validators.required]),
    pricePerNight: new FormControl(true, [Validators.required])
  });
  
  constructor(private accommodationService: AccommodationInfoService){
    
  }



  ngOnInit(): void {

    for (let i = 0; i < 30; i++) {
      this.amenities.push("Some amenity");
    }
    this.checkedAmenities = new Array(this.amenities.length).fill(false);
  }

  addAccommodation(): void {
    const accommodation: Accommodation = {
      status: 'NEW',
      ownerId: 4,
      name: this.form.value.name || '',
      shortDescription: this.form.value.shortDescription || '',
      minCap: this.form.value.minCap || 0,
      maxCap: this.form.value.maxCap || 0,
      type: this.form.value.type || '',
      automaticReservation: this.form.value.automaticReservation || true,
      country: this.form.value.country || '',
      city: this.form.value.city || '',
      zipCode: this.form.value.zipCode || '',
      street: this.form.value.street || '',
      number: this.form.value.number || '',
      latitude: this.form.value.latitude || 0,
      longitude: this.form.value.longitude || 0,
      description: this.form.value.description || '',
      amenities: this.getCheckedAmenities() || [],
      cancelDuration: this.form.value.cancelDuration || 0,
      pricePerNight: this.form.value.pricePerNight || true
    };
    this.accommodationService.addAccommodation(accommodation).subscribe({
      next: (response: Accommodation) => {
        console.log(response);
        sessionStorage.setItem('newAccommodation', response.id ? response.id.toString() : '0');
      },
      error: (err: any) => {
        console.error('Greska prilikom post metode',err);
      }
    }) 
  }

  toggleAmenity(event: any, index: number): void {
    this.checkedAmenities[index] = event.target.checked;
    console.log()
  }

  getCheckedAmenities(): number[] {
  const checked: number[] = [];
  for (let i = 0; i < this.checkedAmenities.length; i++) {
    if (this.checkedAmenities[i]) {
      checked.push(i);
    }
  }
  return checked;
}
}
