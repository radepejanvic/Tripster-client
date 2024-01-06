import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import Annotation from 'chartjs-plugin-annotation';
import { AnalyticsService } from '../analytics.service';
import { Analytics } from '../model/analytics.model';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthorizationService } from '../../authorization/authorization.service';

@Component({
  selector: 'app-annual-analytics',
  templateUrl: './annual-analytics.component.html',
  styleUrl: './annual-analytics.component.css'
})
export class AnnualAnalyticsComponent implements OnInit {
  private newLabel? = 'New label';
  analytics!: Analytics[];
  lineChartData: ChartConfiguration['data'];
  accommodations: string[] = [];
  checked: boolean = false;

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private analyticsService: AnalyticsService, private authorizationService: AuthorizationService) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.analyticsService.getAnnual(this.authorizationService.getPersonId(), 2023).subscribe({
      next: (response: Analytics[]) => {
        this.analytics = response;
        this.loadLineChartData();
        console.log(`Succesfully fetched analytics for ${response.length} accommodations.`);
      },
      error: (err: any) => {
        console.error('Error fetching analytics.', err);
      }
    })
  }

  loadLineChartData(): void {
    let datasets = [];

    for (const analytic of this.analytics) {
      datasets.push({
        data: analytic.revenuePerMonth,
        backgroundColor: 'rgba(0,0,0,0)',
        label: analytic.name,
        fill: 'origin'
      })
      this.accommodations.push(analytic.name);
    }

    this.lineChartData = {
      datasets: datasets,
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }

}
