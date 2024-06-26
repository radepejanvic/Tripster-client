import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { RatingComponent } from './rating/rating.component';
import { OverviewComponent } from './overview/overview.component';
import { AmenityComponent } from './amenity/amenity.component';
import { RouterModule } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { RatingStatsComponent } from './rating-stats/rating-stats.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RentComponent } from './rent/rent.component';
import { AccommodationCrudComponent } from './accommodation-crud/accommodation-crud.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PriceListComponent } from './price-list/price-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { CalendarModule } from 'primeng/calendar';
import { DetailsComponent } from './details/details.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ReportModule } from '../report/report.module';

@NgModule({
  declarations: [
    PhotosComponent,
    RatingComponent,
    OverviewComponent,
    AmenityComponent,
    ReviewComponent,
    RatingStatsComponent,
    ReviewsComponent,
    RentComponent,
    AccommodationCrudComponent,
    PhotoUploadComponent,
    PriceListComponent,
    MapComponent,
    ReviewFormComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgxDropzoneModule,
    BrowserModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    CalendarModule,
    ToggleButtonModule,
    ReportModule,
  ],
  exports: [
    PhotosComponent,
    RatingComponent,
    AccommodationCrudComponent,
    OverviewComponent,
    ReviewComponent,
  ],
})
export class AccommodationInfoModule {}
