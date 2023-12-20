import { Component, Input, OnInit } from '@angular/core';
import { DateRange, MatCalendar } from '@angular/material/datepicker';
import { Day, DayAdapter, Reservation } from '../model/reservation.model';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthorizationService } from '../../authorization/authorization.service';
import { ReservationService } from '../reservation.service';
import { UtilService } from 'src/app/shared/util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent implements OnInit {

  @Input() name?: string;

  constructor(private authorizationService: AuthorizationService, 
              private reservationService: ReservationService,
              private util: UtilService,
              private route: ActivatedRoute) {}

  
  start: Date;
  end: Date; 
  id: number;
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
  }


  onSubmit() {
    this.errorText = '';
    console.log(this.reservationForm);
    if (!this.reservationForm.valid) { 
      this.errorText = "Form is invalid.";
      return;
     }
     console.log(this.util.formatDate(this.start));
    const reservation: Reservation = {
      start: this.start || new Date, 
      end: this.end || new Date,
      duration: this.calculateDuration(),
      guestsNo: this.reservationForm.value.guestsNo,
      price: this.reservationForm.value.price,
      guestId: this.authorizationService.getPersonId(),
      accommodationId: this.id
    }
    this.reservationService.addReservation(reservation).subscribe(
        (response: Reservation) => {
          console.log("Reservation added successfully.");
          console.log(response);
          
        },
        (error: any) => {
          console.error("Failed to create a reservation.", error);
        }
    ) 

    
    
  }

  setCustomValidators() {
    this.reservationForm.setValidators(this.capValidator.bind(this));
    this.reservationForm.updateValueAndValidity();
  }

  capValidator(control: AbstractControl): ValidationErrors | null {

    const start = control.get('start')?.value;
    const end = control.get('end')?.value;

    if (start > end) {
      return { 'dateError': true, 'message': 'Start date can`t be after than end date.' }
    }

    return null;
  }

  calculateDuration(): number {
    const end = this.end?.valueOf() || 0;
    const start = this.start?.valueOf() || 0;
    if (end == 0 || start == 0) {
      return 0;
    }
    return (end - start) / (1000 * 3600 * 24);
  } 

  dateFilter = (date: Date | null): boolean => {
    // Check if the given date exists in the availableDates array
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

  rangeFilter = (date: Date | null): boolean => {
        if (!date || !this.calendar) {
          return false;
        }
        return this.calendar.some(availableDate => this.isSameDay(availableDate.date, date));
           
    };

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

}
