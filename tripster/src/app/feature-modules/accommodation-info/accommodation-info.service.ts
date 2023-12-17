import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accommodation, PriceList, PriceListAdapter, Review } from './model/accommodation.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/env/env';
import { UtilService } from 'src/app/shared/util.service';

@Injectable({
  providedIn: 'root'
})
export class AccommodationInfoService {

  constructor(private http: HttpClient, private util: UtilService) { }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.http.get<Accommodation>(`${environment.apiHost}accommodations/${id}`);
  }

  getPhotos(id: number): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiHost}photos/${id}`).pipe(
      map((base64Strings: string[]) => {
        const dataUrls = base64Strings.map(base64 => this.util.base64ToDataURL(base64));
        return dataUrls;
      })
    );
  }

  addAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.post<Accommodation>(`${environment.apiHost}accommodations`, accommodation);
  }

  updateAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.put<Accommodation>(`${environment.apiHost}accommodations`, accommodation);
  }

  uploadPhotos(id: number, photos: File[]): Observable<number> {

    const formData = new FormData();
    for (let i = 0; i < photos.length; i++) {
      formData.append('photo', photos[i]);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<number>(`${environment.apiHost}photos/${id}`, formData, { headers });
  }

  addPricelists(id: number, pricelists: PriceList[]): Observable<number> {
    return this.http.post<number>(`${environment.apiHost}accommodations/price/${id}`, pricelists);
  }

  updatePricelists(id: number, pricelists: PriceList[]): Observable<number> {
    return this.http.put<number>(`${environment.apiHost}accommodations/price/${id}`, pricelists);
  }

  getPricelists(id: number): Observable<PriceListAdapter[]> {
    return this.http.get<PriceListAdapter[]>(`${environment.apiHost}accommodations/pricelists/${id}`);
  }

  getReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiHost}accommodations/reviews/${id}`);
  }

}
