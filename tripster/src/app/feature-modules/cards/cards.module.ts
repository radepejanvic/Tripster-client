import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationInfoCardComponent } from './accommodation-info-card/accommodation-info-card.component';
import { AccommodationInfoModule } from '../accommodation-info/accommodation-info.module';
import { RouterModule } from '@angular/router';
import { AccommodationRequestCardComponent } from './accommodation-request-card/accommodation-request-card.component';
import { HostAccommodationCardComponent } from './host-accommodation-card/host-accommodation-card.component';
import { GuestReservationCardComponent } from './guest-reservation-card/guest-reservation-card.component';
import { HostReservationCardComponent } from './host-reservation-card/host-reservation-card.component';
import { AccommodationReviewCardComponent } from './accommodation-review-card/accommodation-review-card.component';
import { AccommodationReviewReportCardComponent } from './accommodation-review-report-card/accommodation-review-report-card.component';
import { UserReviewCardComponent } from './user-review-card/user-review-card.component';
import { UserReportReviewCardComponent } from './user-report-review-card/user-report-review-card.component';
import { UserReportCardComponent } from './user-report-card/user-report-card.component';

@NgModule({
  declarations: [
    AccommodationInfoCardComponent,
    AccommodationRequestCardComponent,
    HostAccommodationCardComponent,
    GuestReservationCardComponent,
    HostReservationCardComponent,
    AccommodationReviewCardComponent,
    AccommodationReviewReportCardComponent,
    UserReviewCardComponent,
    UserReportReviewCardComponent,
    UserReportCardComponent,
  ],
  imports: [CommonModule, AccommodationInfoModule, RouterModule],
  exports: [
    AccommodationInfoCardComponent,
    AccommodationRequestCardComponent,
    HostAccommodationCardComponent,
    GuestReservationCardComponent,
    HostReservationCardComponent,
    AccommodationReviewCardComponent,
    AccommodationReviewReportCardComponent,
    UserReviewCardComponent,
    UserReportCardComponent,
    UserReportReviewCardComponent,
  ],
})
export class CardsModule {}
