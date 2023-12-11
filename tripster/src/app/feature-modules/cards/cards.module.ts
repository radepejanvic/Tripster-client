import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationInfoCardComponent } from './accommodation-info-card/accommodation-info-card.component';
import { AccommodationInfoModule } from '../accommodation-info/accommodation-info.module';
import { RouterModule } from '@angular/router';
import { AccommodationRequestCardComponent } from './accommodation-request-card/accommodation-request-card.component';


@NgModule({
  declarations: [
    AccommodationInfoCardComponent,
    AccommodationRequestCardComponent
  ],
  imports: [
    CommonModule,
    AccommodationInfoModule,
    RouterModule
  ],
  exports:[
    AccommodationInfoCardComponent,
    AccommodationRequestCardComponent
  ]
})
export class CardsModule { }
