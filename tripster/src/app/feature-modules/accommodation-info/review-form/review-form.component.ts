import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent {
  @Input() id!: number;


}
