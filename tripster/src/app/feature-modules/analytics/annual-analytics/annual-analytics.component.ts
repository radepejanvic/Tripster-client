import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import Annotation from 'chartjs-plugin-annotation';
import { AnalyticsService } from '../analytics.service';
import { Analytics } from '../model/analytics.model';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthorizationService } from '../../authorization/authorization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-annual-analytics',
  templateUrl: './annual-analytics.component.html',
  styleUrl: './annual-analytics.component.css'
})
export class AnnualAnalyticsComponent implements OnInit {
  analytics!: Analytics[];
  lineChartData: ChartConfiguration['data'];
  accommodations: string[] = [];
  checked: boolean = false;

  form = new FormGroup({
    year: new FormControl(new Date().getFullYear(), Validators.required),
  });

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
    this.getAnnualAnalytics(new Date().getFullYear());
  }

  getAnnualAnalytics(year: number): void {
    console.log(this.form.value.year);

    this.analyticsService.getAnnual(this.authorizationService.getPersonId(), year).subscribe({
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
        data: this.checked ? analytic.reservationsPerMonth : analytic.revenuePerMonth,
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

  onSubmit(): void {
    if (!this.form.valid) {
      console.log('Invalid form.');
      return;
    }

    let year = this.form.value.year || new Date().getFullYear();
    this.getAnnualAnalytics(year);

  }

  private getBase64Image(): string {
    const canvas = document.querySelector('#a-chart') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/png');
    return imageData.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  private calculateHeight(table: HTMLElement, width: number): number {
    const tableWidth = table.clientWidth;
    const tableHeight = table.clientHeight;
    const aspectRatio = tableWidth / tableHeight;

    return width / aspectRatio;
  }

  exportToPDF(): void {
    const container = document.querySelector('#annual-chart') as HTMLElement;
    const table = document.querySelector('#annual-table') as HTMLElement;

    if (container instanceof HTMLElement && table instanceof HTMLElement) {
      html2canvas(container).then((canvas) => {
        const pdf = new jspdf.jsPDF();

        pdf.text(this.generateTitle(), 10, 10);
        pdf.addImage(this.getBase64Image(), 'PNG', 10, 20, 180, 100);

        html2canvas(table, { scale: 1 }).then((tableCanvas) => {
          pdf.addImage(tableCanvas.toDataURL('image/png'), 'PNG', 10, 130, 180, this.calculateHeight(table, 180));

          this.checked = !this.checked;
          this.loadLineChartData();

          setTimeout(() => {

            pdf.addPage();
            pdf.text(this.generateTitle(), 10, 10);
            pdf.addImage(this.getBase64Image(), 'PNG', 10, 20, 180, 100);

            html2canvas(table, { scale: 1 }).then((secondTableCanvas) => {
              pdf.addImage(secondTableCanvas.toDataURL('image/png'), 'PNG', 10, 130, 180, this.calculateHeight(table, 180));

              pdf.save(`annual-analytics-${this.form.value.year}.pdf`);
            });
          }, 1000);
        });

      });
    }
  }

  private generateTitle(): string {
    return this.checked ? `Montlhy reservations for the calendar year ${this.form.value.year}` : `Montlhy revenue for the calendar year ${this.form.value.year}`;
  }



}
