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
import { FormsModule } from '@angular/forms';

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
    PriceListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgxDropzoneModule,
    BrowserModule,
    FormsModule
  ],
  exports: [
    PhotosComponent,
    AccommodationCrudComponent
  ]
})
export class AccommodationInfoModule { }
