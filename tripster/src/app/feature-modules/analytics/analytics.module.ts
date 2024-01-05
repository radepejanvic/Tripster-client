import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualAnalyticsComponent } from './annual-analytics/annual-analytics.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { AnalyticsComponent } from './analytics/analytics.component';


@NgModule({
  declarations: [
    AnnualAnalyticsComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: true } }
  ],
  exports: [
    AnalyticsComponent
  ]
})
export class AnalyticsModule { }
