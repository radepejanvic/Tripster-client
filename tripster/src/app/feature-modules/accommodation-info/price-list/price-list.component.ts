import { Component, ElementRef, ViewChild } from '@angular/core';
import { PriceList } from '../model/accommodation.model';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent {

  @ViewChild('tableScroll') tableScroll!: ElementRef;

  start: Date = new Date();
  end: Date = new Date();
  standard!: number;
  weekend!: number;
  holiday!: number;
  selectedRow: number = -1;

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
    this.scrollToBottom();

    this.start = new Date();
    this.end = new Date();
    this.standard = 0;
    this.weekend = 0;
    this.holiday = 0;
  }

  selectRow(index: number): void {
    this.selectedRow = index;
  }

  removeRow(): void {
    if (this.selectedRow !== -1) {
      this.priceLists.splice(this.selectedRow, 1);
      this.selectedRow = -1;
    }
  }

  scrollToBottom(): void {
    if (this.tableScroll) {
      const containerElem = this.tableScroll.nativeElement;
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }

}
