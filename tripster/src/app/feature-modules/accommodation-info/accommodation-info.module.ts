import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { MaterialModule } from '../../infrastructure/material/material.module';


@NgModule({
  declarations: [
    PhotosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PhotosComponent
  ]
})
export class AccommodationInfoModule { }
