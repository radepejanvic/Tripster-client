import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationInfoCardComponent } from './accommodation-info-card/accommodation-info-card.component';
import { AccommodationInfoModule } from '../accommodation-info/accommodation-info.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AccommodationInfoCardComponent
  ],
  imports: [
    CommonModule,
    AccommodationInfoModule,
    RouterModule
  ],
  exports:[
    AccommodationInfoCardComponent
  ]
})
export class CardsModule { }
