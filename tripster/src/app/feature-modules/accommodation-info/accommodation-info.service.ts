import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accommodation } from './model/accommodation.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/env/env';

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
        return dataUrls;
      })
    );
  }

  private getDataUrl(base64String: string): string {
    const contentType = 'image/jpeg';
    return `data:${contentType};base64,${base64String}`;
  }

  addAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.post<Accommodation>(environment.apiHost + 'accommodations', accommodation);
  }

  uploadPhotos(id: number, photos: File[]): void {

    const formData = new FormData();
    for (let i = 0; i < photos.length; i++) {
      formData.append('photo', photos[i]);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.http.post<any>(`${environment.apiHost}${id}`, formData, {headers});
  }

}
