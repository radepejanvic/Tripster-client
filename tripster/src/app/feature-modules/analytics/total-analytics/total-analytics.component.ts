import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Analytics } from '../model/analytics.model';
import { AnalyticsService } from '../analytics.service';
import { AuthorizationService } from '../../authorization/authorization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-total-analytics',
  templateUrl: './total-analytics.component.html',
  styleUrl: './total-analytics.component.css'
})
export class TotalAnalyticsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  analytics!: Analytics[];
  startDate: Date;
  endDate: Date;

  form = new FormGroup({
    start: new FormControl(new Date(), Validators.required),
    end: new FormControl(new Date(), Validators.required)
  });

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]>;

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor(private analyticsService: AnalyticsService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.getTotalAnalytics(new Date().getMilliseconds(), new Date().getMilliseconds());
  }

  getTotalAnalytics(start: number, end: number): void {
    this.analyticsService.getTotal(this.authorizationService.getPersonId(), start, end).subscribe({
      next: (response: Analytics[]) => {
        this.analytics = response;
        this.loadPieChartData();
        console.log(`Pie: Succesfully fetched analytics for ${response.length} accommodations.`);
      },
      error: (err: any) => {
        console.error('Pie: Error fetching analytics.', err);
      }
    })
  }

  loadPieChartData(): void {
    let labels = [];
    let data = [];

    for (const analytic of this.analytics) {
      console.log(analytic);
      labels.push([analytic.name, 'Reservations: ' + analytic.totalReservations]);
      data.push(analytic.totalRevenue);
    }

    this.pieChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
        },
      ],
    };
  }

  onSubmit(): void {
    if (!this.form.valid) {
      console.log('Invalid form.');
      return;
    }

    const startValue = this.form.value.start;
    const endValue = this.form.value.end;

    if (startValue && endValue) {
      this.startDate = new Date(startValue);
      this.endDate = new Date(endValue);

      if (!isNaN(this.startDate.getTime()) && !isNaN(this.endDate.getTime())) {

        const startTimestamp = this.startDate.getTime();
        const endTimestamp = this.endDate.getTime();

        console.log(startTimestamp);
        console.log(endTimestamp);

        if (endTimestamp > startTimestamp) {
          this.getTotalAnalytics(startTimestamp, endTimestamp);
        }
        return;
      }
    }

    console.log('Invalid date values.');
  }


}