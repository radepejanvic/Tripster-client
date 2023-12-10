import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFilterComponent } from './basic-filter/basic-filter.component';
import { AdditionalFilterComponent } from './additional-filter/additional-filter.component';
import { GuestRatingFilterComponent } from './guest-rating-filter/guest-rating-filter.component';
import { ReservationStatusFilterComponent } from './reservation-status-filter/reservation-status-filter.component';
import { TimeFilterComponent } from './time-filter/time-filter.component';
import { UserTypeStatusFilterComponent } from './user-type-status-filter/user-type-status-filter.component';
import { AccommodationRequestsFilterComponent } from './accommodation-requests-filter/accommodation-requests-filter.component';
import { ReviewFilterComponent } from './review-filter/review-filter.component';



@NgModule({
  declarations: [
    BasicFilterComponent,
    AdditionalFilterComponent,
    GuestRatingFilterComponent,
    ReservationStatusFilterComponent,
    TimeFilterComponent,
    UserTypeStatusFilterComponent,
    AccommodationRequestsFilterComponent,
    ReviewFilterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BasicFilterComponent,
    AdditionalFilterComponent,
    GuestRatingFilterComponent,
    ReservationStatusFilterComponent,
    TimeFilterComponent,
    UserTypeStatusFilterComponent,
    AccommodationRequestsFilterComponent,
    ReviewFilterComponent
  ]
})
export class FilterModule { }
