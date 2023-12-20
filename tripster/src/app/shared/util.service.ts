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

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const year = date.getFullYear();
    return `${day}. ${month} ${year}.`;
  }

  arrayToDate(dateArray: number[]): Date | null {
    if (dateArray.length !== 3) {
      console.error('Invalid date array format. Expecting [year, month, day].');
      return null;
    }

    const [year, month, day] = dateArray;

    const date = new Date(year, month - 1, day);

    return date;
  }


}
