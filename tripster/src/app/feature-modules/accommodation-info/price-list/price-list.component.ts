import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PriceList, PriceListAdapter } from '../model/accommodation.model';
import { AccommodationInfoService } from '../accommodation-info.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.css'
})
export class PriceListComponent implements OnInit {

  @ViewChild('tableScroll') tableScroll!: ElementRef;

  id!: number;
  start: Date = new Date();
  end: Date = new Date();
  price!: number;
  weekend!: number;
  holiday!: number;
  selectedRow: number = -1;

  priceLists: PriceList[] = [];

  availability: string = 'true';
  activePricelists: PriceList[] = [];

  mode = 'add';


  constructor(private accommodationService: AccommodationInfoService) { }

  ngOnInit(): void {
    this.setIdAndMode();
    this.getPricelists();
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const year = date.getFullYear();
    return `${day}. ${month} ${year}.`;
  }

  addPriceList() {
    if (this.start > this.end || this.price <= 0) {
      return;
    }
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

    this.accommodationService.addPricelists(this.id, this.priceLists).subscribe({
      next: (response: number) => {
        console.log(`New calendar has ${response} days!`);
        this.priceLists = [];
        this.getPricelists();
        this.mode = 'update';
      },
      error: (err: any) => {
        console.error('Post pricelists failed.', err);
      }
    })

  }

  putPriceLists(): void {

    this.accommodationService.updatePricelists(this.id, this.priceLists).subscribe({
      next: (response: number) => {
        console.log(`Updated calendar has ${response} days!`);
        this.priceLists = [];
        this.getPricelists();
      },
      error: (err: any) => {
        console.error('Put pricelists failed.', err);
      }
    })

  }

  getPricelists(): void {

    this.accommodationService.getPricelists(this.id).subscribe({
      next: (response: PriceListAdapter[]) => {
        console.log(`Retrieved ${response.length} different pricelists!`);

        this.activePricelists = this.adapterToPricelist(response);
      },
      error: (err: any) => {
        console.error('Get pricelists failed.', err);
      }
    })
  }


  adapterToPricelist(adapters: PriceListAdapter[]): PriceList[] {
    return adapters.map((adapter) => {
      const startDate = this.arrayToDate(adapter.start);
      const endDate = this.arrayToDate(adapter.end);

      if (!startDate || !endDate) {
        return {
          accommodationId: adapter.accommodationId,
          start: new Date(),
          end: new Date(),
          price: adapter.price,
        };
      }

      return {
        accommodationId: adapter.accommodationId,
        start: startDate,
        end: endDate,
        price: adapter.price,
      };
    });
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

  setIdAndMode() {
    let id = sessionStorage.getItem('updatedAccommodation');
    if (id && !isNaN(+id)) {
      this.id = +id;
      this.mode = 'update';
      return;
    }

    id = sessionStorage.getItem('newAccommodation');
    if (id && !isNaN(+id)) {
      this.id = +id;
      // this.mode = 'add';
    }
  }

  getMinDate(): Date {
    let date: Date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  disableInterval(): void {
    let interval: PriceList = {
      start: this.start,
      end: this.end
    }

    this.accommodationService.disableInterval(this.id, interval).subscribe({
      next: (response: number) => {
        console.log(`Disabled ${response} dates.`);
        this.priceLists = [];
        this.getPricelists();
      },
      error: (err: any) => {
        console.error('Failed to disable interval', err);
      }
    })

  }

}
