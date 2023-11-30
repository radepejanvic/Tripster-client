import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { RatingComponent } from './rating/rating.component';
import { OverviewComponent } from './overview/overview.component';
import { AmenityComponent } from './amenity/amenity.component';
import { RouterModule } from '@angular/router';
import { ReviewComponent } from './review/review.component';


@NgModule({
  declarations: [
    PhotosComponent,
    RatingComponent,
    OverviewComponent,
    AmenityComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    PhotosComponent
  ]
})
export class AccommodationInfoModule { }
