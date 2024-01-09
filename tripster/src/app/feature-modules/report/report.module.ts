import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFormComponent } from './report-form/report-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';



@NgModule({
  declarations: [
    ReportFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReportFormComponent
  ]
})
export class ReportModule { }
