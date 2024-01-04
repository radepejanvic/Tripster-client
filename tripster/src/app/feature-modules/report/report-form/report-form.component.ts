import { Component, Inject } from '@angular/core';
import { ReportService } from '../report.service';
import { AuthorizationService } from '../../authorization/authorization.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from '../model/report.model';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent {
  id!: number;
  type: string = 'host-report';

  constructor(
    private reportService: ReportService,
    private authorizationService: AuthorizationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReportFormComponent>) { }



  form = new FormGroup({
    reason: new FormControl('', [Validators.required])
  });


  ngOnInit(): void {
    this.id = this.data.id;
    this.type = this.data.type;
  }


  mapFormToReport(): Report {
    const report: Report = {
      reason: this.form.value.reason || "",
      reporterId: this.authorizationService.getUserId(),
      reporteeId: this.id
    }

    return report;
  }

  onSubmit(): void {
    if (!this.form.valid) {
      console.error("Invalid form");
      return;
    }

    let report: Report = this.mapFormToReport();

    switch (this.type) {
      case 'host-report': this.reportUser(report); break;
      case 'guest-report': this.reportUser(report); break;
      case 'host-review-report': this.reportHostReview(); break;
      case 'accommodation-review-report': this.reportAccommodationReview(); break;
    }

    this.dialogRef.close();
  }

  reportUser(report: Report): void {
    this.reportService.reportUser(report).subscribe({
      next: (response: Report) => {
        console.log(`Successfully reported user with id: ${response.reporteeId}`);
      },
      error: (err: any) => {
        console.error(`Failed to report user with id: ${this.id}`, err);
      }
    })
  }


  reportHostReview(): void {

  }

  reportAccommodationReview(): void {

  }

}
