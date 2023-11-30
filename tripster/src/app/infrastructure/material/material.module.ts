import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatGridListModule,
    MatProgressBarModule
  ],
  exports: [
    MatGridListModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }
