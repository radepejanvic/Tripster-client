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

  addAccommodationReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${environment.apiHost}accommodations/reviews`, review);
  }

  addUserReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${environment.apiHost}users/reviews`, review);
  }

  canReviewAccommodation(accommodation: number, guest: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiHost}accommodations/reviews/${accommodation}/${guest}`);
  }

  canReviewHost(host: number, guest: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiHost}users/reviews/${host}/${guest}`);
  }
}
