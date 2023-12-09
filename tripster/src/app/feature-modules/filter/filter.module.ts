import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFilterComponent } from './basic-filter/basic-filter.component';
import { AdditionalFilterComponent } from './additional-filter/additional-filter.component';
import { GuestRatingFilterComponent } from './guest-rating-filter/guest-rating-filter.component';



@NgModule({
  declarations: [
    BasicFilterComponent,
    AdditionalFilterComponent,
    GuestRatingFilterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BasicFilterComponent,
    AdditionalFilterComponent,
    GuestRatingFilterComponent
  ]
})
export class FilterModule { }
