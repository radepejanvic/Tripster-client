import { Component, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent {
  from?: Date;
  to?: Date;

  startAt: Date = this.goToNextMonth();

  @ViewChild('calendar', { static: false }) calendar!: MatCalendar<Date>;

  goToNextMonth(): Date {
    const now: Date = new Date();
    now.setMonth(now.getMonth() + 1);
    return now;
  }


}
