import { Component, ElementRef, ViewChild } from '@angular/core';
import { PriceList } from '../model/accommodation.model';
import { AccommodationInfoService } from '../accommodation-info.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent {

  @ViewChild('tableScroll') tableScroll!: ElementRef;

  start: Date = new Date();
  end: Date = new Date();
  price!: number;
  weekend!: number;
  holiday!: number;
  selectedRow: number = -1;

  priceLists: PriceList[] = [];

  constructor(private accommodationService: AccommodationInfoService) { }

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
      price: this.price,
      // weekend: this.weekend,
      // holiday: this.holiday,

    };
    this.priceLists.push(newPriceList);
    console.log(newPriceList.start, ' - ', newPriceList.end);
    this.scrollToBottom();

    this.start = new Date();
    this.end = new Date();
    this.price = 0;
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

  postPriceLists(): void {

    const id = sessionStorage.getItem('newAccommodation');
    if (!id) { return; }

    this.accommodationService.addPricelists(+id, this.priceLists).subscribe({
      next: (response: number) => {
        console.log(`New calendar has ${response} days!`);
        this.priceLists = [];
      },
      error: (err: any) => {
        console.error('Post pricelists failed.', err);
      }
    })

  }

  putPriceLists(): void {

    console.log('Usao');

    const id = sessionStorage.getItem('newAccommodation');
    if (!id) { return; }

    this.accommodationService.updatePricelists(+id, this.priceLists).subscribe({
      next: (response: number) => {
        console.log(`Updated calendar has ${response} days!`);
        this.priceLists = [];
      },
      error: (err: any) => {
        console.error('Put pricelists failed.', err);
      }
    })

  }

}
