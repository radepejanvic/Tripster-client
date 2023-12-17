import { Component, Input, OnInit } from '@angular/core';
import { Accommodation } from '../model/accommodation.model';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AccommodationInfoService } from '../accommodation-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accommodation-crud',
  templateUrl: './accommodation-crud.component.html',
  styleUrl: './accommodation-crud.component.css'
})
export class AccommodationCrudComponent implements OnInit {
  id?: number;
  accommodation!: Accommodation;
  checkedAmenities: boolean[] = [];
  mode: string = 'add';


  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required]),
    minCap: new FormControl(1, [Validators.required]),
    maxCap: new FormControl(1, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    automaticReservation: new FormControl(true, [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    // latitude: new FormControl(0, [Validators.required]),
    // longitude: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    cancelDuration: new FormControl(0, [Validators.required])
    // pricePerNight: new FormControl(true, [Validators.required])
  });

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationInfoService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      sessionStorage.setItem('updatedAccommodation', this.id.toString());
    });

    this.initializeAmenities();

    if (this.id) {
      this.mode = 'update';
      this.accommodationService.getAccommodation(this.id).subscribe({
        next: (response: Accommodation) => {
          this.accommodation = response;
          this.mapAccommodationToForm();
          for (let amenity of this.accommodation.amenities) {
            this.checkedAmenities[amenity - 1] = true;
          }
          console.log(this.checkedAmenities);
        },
        error: (err: any) => {
          console.error('Failed to get the accommodation', err);
        }
      })
    }
  }

  initializeAmenities() {
    this.checkedAmenities = new Array(12).fill(false);
  }

  mapAccommodationToForm(): void {
    this.form.patchValue({
      name: this.accommodation.name,
      shortDescription: this.accommodation.shortDescription,
      minCap: this.accommodation.minCap,
      maxCap: this.accommodation.maxCap,
      type: this.accommodation.type,
      automaticReservation: this.accommodation.automaticReservation,
      country: this.accommodation.country,
      city: this.accommodation.city,
      zipCode: this.accommodation.zipCode,
      street: this.accommodation.street,
      number: this.accommodation.number,
      // latitude: this.accommodation.latitude,
      // longitude: this.accommodation.longitude,
      description: this.accommodation.description,
      cancelDuration: this.accommodation.cancelDuration,
      // pricePerNight: this.accommodation.pricePerNight
    });
  }

  mapFormToAccommodation() {
    this.accommodation = {
      id: this.id ? this.id : NaN,
      status: 'NEW',
      ownerId: 4,
      name: this.form.value.name || '',
      shortDescription: this.form.value.shortDescription || '',
      minCap: this.form.value.minCap || 1,
      maxCap: this.form.value.maxCap || 1,
      type: this.form.value.type || '',
      automaticReservation: this.form.value.automaticReservation || true,
      country: this.form.value.country || '',
      city: this.form.value.city || '',
      zipCode: this.form.value.zipCode || '',
      street: this.form.value.street || '',
      number: this.form.value.number || '',
      // latitude: this.form.value.latitude || 0,
      // longitude: this.form.value.longitude || 0,
      description: this.form.value.description || '',
      amenities: this.getCheckedAmenities() || [],
      cancelDuration: this.form.value.cancelDuration || 0,
      pricePerNight: true
    };
  }

  onSubmit(): void {
    this.mapFormToAccommodation()
    console.log(this.accommodation);
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach((controlName) => {
        const control = this.form.get(controlName);
        if (control?.invalid) {
          // Log or handle the invalid control here
          console.error(`Control '${controlName}' is invalid. Errors: `, control.errors);
        }
      });
      return;
    }

    this.mapFormToAccommodation();

    if (this.id) {
      this.updateAccommodation();
    } else {
      this.addAccommodation();
    }

  }

  addAccommodation() {
    this.accommodationService.addAccommodation(this.accommodation).subscribe({
      next: (response: Accommodation) => {
        console.log(response);
        sessionStorage.setItem('newAccommodation', response.id ? response.id.toString() : '0');
        this.mode = 'main-form';
      },
      error: (err: any) => {
        console.error('Failed to register new accommodation.', err);
      }
    })
  }

  updateAccommodation() {

    console.log('Ovde ga logujem: ', this.accommodation);

    this.accommodationService.updateAccommodation(this.accommodation).subscribe({
      next: (response: Accommodation) => {
        console.log(response);
      },
      error: (err: any) => {
        console.error(`Failed to update accommodation ${this.id}.`, err);
      }
    })
  }


  toggleAmenity(event: any, index: number): void {
    this.checkedAmenities[index] = event.target.checked;
  }

  getCheckedAmenities(): number[] {
    const checked: number[] = [];
    for (let i = 0; i < this.checkedAmenities.length; i++) {
      if (this.checkedAmenities[i]) {
        checked.push(i + 1);
      }
    }
    return checked;
  }

  setCustomValidators() {
    this.form.setValidators(this.capValidator.bind(this));
    this.form.setValidators(this.shortDescValidator.bind(this));
    this.form.updateValueAndValidity();
  }

  capValidator(control: AbstractControl): ValidationErrors | null {

    const minCap = control.get('minCap')?.value;
    const maxCap = control.get('maxCap')?.value;

    if (maxCap < minCap) {
      return { 'capacityError': true, 'message': 'MinCap can`t be greater than MaxCap.' }
    }

    return null;
  }

  shortDescValidator(control: AbstractControl): ValidationErrors | null {
    const shortDescription = control.get('shortDescription')?.value;

    if (shortDescription.length > 75) {
      return { 'descriptionError': true, 'message': 'Short description can`t be longer than 75 characters.' }
    }

    return null;
  }

  handleModeChange(mode: string) {
    this.mode = mode;
  }

  isValidName(): boolean {
    const name = this.form.get('name');
    return !!name?.hasError('required') && !!name?.touched;
  }

  isValidShortDescription(): boolean {
    const shortDescription = this.form.get('shortDescription');
    return !!shortDescription?.hasError('required') && !!shortDescription?.touched;
  }

  isValidMinCap(): boolean {
    const minCap = this.form.get('minCap');
    return !!minCap?.hasError('required') && !!minCap?.touched;
  }

  isValidMaxCap(): boolean {
    const maxCap = this.form.get('maxCap');
    return !!maxCap?.touched && !!maxCap?.hasError('required');
  }

  isValidType(): boolean {
    const type = this.form.get('type');
    return !!type?.hasError('required') && !!type?.touched;
  }

  isValidAutomaticReservation(): boolean {
    const automaticReservation = this.form.get('automaticReservation');
    return !!automaticReservation?.hasError('required') && !!automaticReservation?.touched;
  }

  isValidCountry(): boolean {
    const country = this.form.get('country');
    return !!country?.hasError('required') && !!country?.touched;
  }

  isValidCity(): boolean {
    const city = this.form.get('city');
    return !!city?.hasError('required') && !!city?.touched;
  }

  isValidZipCode(): boolean {
    const zipCode = this.form.get('zipCode');
    return !!zipCode?.hasError('required') && !!zipCode?.touched;
  }

  isValidStreet(): boolean {
    const street = this.form.get('street');
    return !!street?.hasError('required') && !!street?.touched;
  }

  isValidNumber(): boolean {
    const number = this.form.get('number');
    return !!number?.hasError('required') && !!number?.touched;
  }

  isValidLatitude(): boolean {
    const latitude = this.form.get('latitude');
    return !!latitude?.hasError('required') && !!latitude?.touched;
  }

  isValidLongitude(): boolean {
    const longitude = this.form.get('longitude');
    return !!longitude?.hasError('required') && !!longitude?.touched;
  }

  isValidDescription(): boolean {
    const description = this.form.get('description');
    return !!description?.hasError('required') && !!description?.touched;
  }

  isValidCancelDuration(): boolean {
    const cancelDuration = this.form.get('cancelDuration');
    return !!cancelDuration?.hasError('required') && !!cancelDuration?.touched;
  }

  isValidPricePerNight(): boolean {
    const pricePerNight = this.form.get('pricePerNight');
    return !!pricePerNight?.hasError('required') && !!pricePerNight?.touched;
  }


}
