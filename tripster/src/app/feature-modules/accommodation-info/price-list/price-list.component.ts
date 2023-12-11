import { Component } from '@angular/core';
import { PriceList } from '../model/accommodation.model';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent {

  start: Date = new Date();
  end: Date = new Date();
  standard!: number;
  weekend!: number;
  holiday!: number;

  priceLists: PriceList[] = [];

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const year = date.getFullYear();
    return `${day}. ${month} ${year}.`;
  }

  addPriceList() {
    const newPriceList: PriceList = {
      start: this.start,
      end: this.end,
      standard: this.standard,
      weekend: this.weekend,
      holiday: this.holiday,

    };
    this.priceLists.push(newPriceList);

    this.start = new Date();
    this.end = new Date();
    this.standard = 0;
    this.weekend = 0;
    this.holiday = 0;
  }

}
