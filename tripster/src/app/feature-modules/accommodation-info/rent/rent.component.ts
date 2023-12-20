import { Component, Input, OnInit } from '@angular/core';
import { DateRange, MatCalendar } from '@angular/material/datepicker';
import { Day, Reservation } from '../model/reservation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selectedDateRange: DateRange<Date>;

  constructor(private authorizationService: AuthorizationService, 
              private reservationService: ReservationService,
              private util: UtilService,
              private route: ActivatedRoute) {}

  today: Date = new Date();
  id: number;
  totalPrice: number;
  calendar: Day[] = [];
  errorText: string = '';

  reservationForm: FormGroup = new FormGroup({
   
    guestsNo: new FormControl(1, [Validators.required]),
    
  })

  ngOnInit(): void {
		this.route.params.subscribe((params) => {
		  this.id = +params['id'];
      
		});
    this.reservationService.getCalendar(this.id).subscribe({
        next: (response: Day[]) => {
          console.log("Calendar fetched successfully.");
          this.calendar = response;
          
        },
        error: (error: any) => {
          console.error("Failed to fetch calendar.", error);
        }
      }
    )
  }

  _onSelectedChange(date: Date): void {
    if (
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date > this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,
        date
      );
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
  }

  onSubmit() {
    if (this.selectedDateRange == null || !this.reservationForm.valid) { 
      this.errorText = "Something wrong."
      console.log("Invalid form.")
      return; }
    const reservation: Reservation = {
      start: this.selectedDateRange.start || new Date, 
      end: this.selectedDateRange.end || new Date,
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

  isDateValid(): boolean {
    if(this.selectedDateRange.end != null && this.selectedDateRange.start != null) {
      return true;
    }
    return false;
  }

  calculateDuration(): number {
    const end = this.selectedDateRange.end?.valueOf() || 0;
    const start = this.selectedDateRange.start?.valueOf() || 0;
    if (end == 0 || start == 0) {
      return 0;
    }
    return (end - start) / (1000 * 3600 * 24);
  } 

}
