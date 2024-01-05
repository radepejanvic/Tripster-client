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
    }

    this.lineChartData = {
      datasets: datasets,
      labels: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
    }

  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] =
          AnnualAnalyticsComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = AnnualAnalyticsComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(
      `Label ${this.lineChartData.labels.length}`
    );

    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.lineChartData.datasets[2].label;
    this.lineChartData.datasets[2].label = tmp;

    this.chart?.update();
  }
}
