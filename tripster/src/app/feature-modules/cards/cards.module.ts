import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationInfoCardComponent } from './accommodation-info-card/accommodation-info-card.component';
import { AccommodationInfoModule } from '../accommodation-info/accommodation-info.module';


@NgModule({
  declarations: [
    AccommodationInfoCardComponent
  ],
  imports: [
    CommonModule,
    AccommodationInfoModule
  ],
  exports:[
    AccommodationInfoCardComponent
  ]
})
export class CardsModule { }
