import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../model/accommodation.model';
import { ReviewService } from '../review.service';
import { AuthorizationService } from '../../authorization/authorization.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent {
  @Input() id!: number;

  constructor(private reviewService: ReviewService, private authorizationService: AuthorizationService) { }

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
    rate: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

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
