import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from './model/accommodation.model';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${environment.apiHost}accommodations/reviews`, review);
  }

}
