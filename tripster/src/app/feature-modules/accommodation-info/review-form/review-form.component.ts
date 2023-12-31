import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../model/accommodation.model';
import { ReviewService } from '../review.service';
import { AuthorizationService } from '../../authorization/authorization.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent implements OnInit {
  id!: number;
  type!: string;

  constructor(private reviewService: ReviewService, private authorizationService: AuthorizationService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
    rate: new FormControl(0, [Validators.required, Validators.min(1)]),
  });


  ngOnInit(): void {
    this.id = this.data.id;
    this.type = this.data.type;
  }


  mapFormToReview(): Review {
    const review: Review = {
      title: this.form.value.title || "",
      rate: this.form.value.rate || 0,
      comment: this.form.value.comment || "",
      reviewerId: this.authorizationService.getPersonId(),
      reviewedId: this.id
    }

    return review;
  }

  onSubmit(): void {
    if (!this.form.valid) {
      console.error("Invalid form");
    }

    this.reviewService.addReview(this.mapFormToReview()).subscribe({
      next: (response: Review) => {
        console.log(response);
      },
      error: (err: any) => {
        console.error("Error posting new review.", err);
      }
    });
  }


}
