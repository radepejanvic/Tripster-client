import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accommodation } from './model/accommodation.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationInfoService {

  constructor(private http: HttpClient) { }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.http.get<Accommodation>('http://localhost:8080/api/accommodations/' + id);
  }

  getPhotos(id: number): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8080/api/photos/${id}`).pipe(
      map((base64Strings: string[]) => {
        const dataUrls = base64Strings.map(base64 => this.getDataUrl(base64));
        console.log('Data URLs:', dataUrls);
        return dataUrls;
      })
    );
  }

  private getDataUrl(base64String: string): string {
    const contentType = 'image/jpeg';
    return `data:${contentType};base64,${base64String}`;
  }



}
