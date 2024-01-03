import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationInfoCardComponent } from './accommodation-info-card/accommodation-info-card.component';
import { AccommodationInfoModule } from '../accommodation-info/accommodation-info.module';
import { RouterModule } from '@angular/router';
import { AccommodationRequestCardComponent } from './accommodation-request-card/accommodation-request-card.component';
import { HostAccommodationCardComponent } from './host-accommodation-card/host-accommodation-card.component';
import { GuestReservationCardComponent } from './guest-reservation-card/guest-reservation-card.component';

@NgModule({
  declarations: [
    AccommodationInfoCardComponent,
    AccommodationRequestCardComponent,
    HostAccommodationCardComponent,
    GuestReservationCardComponent,
  ],
  imports: [CommonModule, AccommodationInfoModule, RouterModule],
  exports: [
    AccommodationInfoCardComponent,
    AccommodationRequestCardComponent,
    HostAccommodationCardComponent,
    GuestReservationCardComponent,
  ],
})
export class CardsModule {}
