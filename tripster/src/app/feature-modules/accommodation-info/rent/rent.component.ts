import { Component, Input, OnInit } from '@angular/core';
import { DateRange, MatCalendar } from '@angular/material/datepicker';
import { Day, DayAdapter, Reservation } from '../model/reservation.model';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthorizationService } from '../../authorization/authorization.service';
import { ReservationService } from '../reservation.service';
import { UtilService } from 'src/app/shared/util.service';
import { ActivatedRoute } from '@angular/router';
import { AccommodationInfoService } from '../accommodation-info.service';
import { error } from 'jquery';
import { Accommodation } from '../model/accommodation.model';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent implements OnInit {

  @Input() name?: string;

  constructor(private authorizationService: AuthorizationService, 
              private reservationService: ReservationService,
              private accommodationService: AccommodationInfoService,
              private util: UtilService,
              private route: ActivatedRoute 
              ) {}

  
  start: Date;
  end: Date; 
  today: Date;
  id: number;
  pricePerNight: boolean = true;
  totalPrice: number;
  calendar: Day[] = [];
  errorText: string = '';

  reservationForm: FormGroup = new FormGroup({
   
    start: new FormControl( Date(), [Validators.required]),
    end: new FormControl( Date(), [Validators.required]),
    guestsNo: new FormControl(1, [Validators.required]),

    
  })

  ngOnInit(): void {
		this.route.params.subscribe((params) => {
		  this.id = +params['id'];
      
		});
    this.reservationService.getCalendar(this.id).subscribe({
        next: (response: DayAdapter[]) => {
          console.log("Calendar fetched successfully.");
          this.calendar = this.adapterToDay(response);
        },
        error: (error: any) => {
          console.error("Failed to fetch calendar.", error);
        }
      }
    )
    this.accommodationService.getAccommodation(this.id).subscribe({
      next: (accommodation : Accommodation) => { this.pricePerNight = accommodation.pricePerNight; },
      error: (error: any) => { console.error("Failed to get pricing type from the accommodation.", error); }
    })
  }


  onSubmit() {
    this.errorText = '';
    if (!this.reservationForm.valid) { 
      this.errorText = "Form is invalid.";
      return;
    }
    if (!this.areDatesValid()) {
      this.errorText = "Start date cannot be after end date."
      return;
    }
    if (!this.isDateRangeContinual()) {
      this.errorText = "Selected dates include invalid dates.";
      return;
    }
    const reservation: Reservation = {
      start: this.reservationForm.value.start || new Date, 
      end: this.reservationForm.value.end || new Date,
      duration: this.calculateDuration(),
      guestsNo: this.reservationForm.value.guestsNo,
      //Ovde se poziva racunanje cene
      price: this.calculatePrice(),
      guestId: this.authorizationService.getPersonId(),
      accommodationId: this.id
    }
    this.reservationService.addReservation(reservation).subscribe(
        (response: Reservation) => {
          console.log("Reservation added successfully.", response);
          
        },
        (error: any) => {
          console.error("Failed to create a reservation.", error);

        }
    ) 
  }
  
  calculateDuration(): number {
    const end = this.reservationForm.value.end?.valueOf() || 0;
    const start = this.reservationForm.value.start?.valueOf() || 0;
    if (end == 0 || start == 0) {
      return 0;
    }
    return (end - start) / (1000 * 3600 * 24);
  } 

  dateFilter = (date: Date | null): boolean => {
    return this.calendar.some(day =>
      this.isSameDay(date, day.date)
    );
  }

  isSameDay(date1: Date | null, date2: Date): boolean {
    if(!date1) return false;
    return (
      date1.getUTCFullYear() === date2.getUTCFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  adapterToDay(adapters: DayAdapter[]): Day[] {
    return adapters.map((adapter) => {
      const date = this.util.arrayToDate(adapter.date);

      if (!date) {
        return {
          date: new Date(),
          price: 0
        };
      }
      return {
          date: date,
          price: adapter.price
      };
    });
  }

  areDatesValid(): boolean {
     return this.reservationForm.value.start < this.reservationForm.value.end;
  }

  isDateRangeContinual(): boolean {
    let checkDay = new Date();
    checkDay.setDate(this.reservationForm.value.start.getDate());
    while(checkDay < this.reservationForm.value.end) {
      checkDay.setDate(checkDay.getDate() + 1);
      if(!this.dateFilter(checkDay)) {
        return false;
      }
    }
    return true;
  }

  calculatePrice(): number {  
    let price = 0;
    let checkDay = new Date();
    checkDay.setDate(this.reservationForm.value.start.getDate());
    while(checkDay < this.reservationForm.value.end) {
      let diff = this.calendar.find(date => this.isSameDay(date.date, checkDay))?.price;
      if (this.pricePerNight) {
        if(diff) price = price + diff;
      } else {
        if(diff) price = price + diff * this.reservationForm.value.guestsNo;
      }
      checkDay.setDate(checkDay.getDate() + 1);
    }
    return price;
  }

}
