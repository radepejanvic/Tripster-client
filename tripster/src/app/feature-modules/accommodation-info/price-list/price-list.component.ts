import { Component } from '@angular/core';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent {

  start: Date = new Date();
  end: Date = new Date();

  priceLists: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // formatDate(date: Date): string {
  //   const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  //   return date.toLocaleDateString('en-GB', options)
  //     .replace(/(\d+) (\w+) (\d+)/, '$1. $2 $3');
  // }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const year = date.getFullYear();
    return `${day}. ${month} ${year}.`;
  }

}
