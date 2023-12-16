import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  base64ToDataURL(base64String: string): string {
    const contentType = 'image/jpeg';
    return `data:${contentType};base64,${base64String}`;
  }
}
