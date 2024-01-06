import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualAnalyticsComponent } from './annual-analytics/annual-analytics.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TotalAnalyticsComponent } from './total-analytics/total-analytics.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AnnualAnalyticsComponent,
    AnalyticsComponent,
    TotalAnalyticsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    ToggleButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: true } }
  ],
  exports: [
    AnalyticsComponent
  ]
})
export class AnalyticsModule { }
