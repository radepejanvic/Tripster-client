import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
  DefaultMatCalendarRangeStrategy,
  MatCalendar
} from '@angular/material/datepicker';
import {
  MatDialogModule,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatSliderModule,
    MatDialogModule

    // MatCalendar
  ],
  exports: [
    MatGridListModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatCalendar,
    MatSliderModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy
    }
  ]
})
export class MaterialModule { }
