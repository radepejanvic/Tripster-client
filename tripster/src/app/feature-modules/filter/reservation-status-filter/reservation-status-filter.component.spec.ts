import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationStatusFilterComponent } from './reservation-status-filter.component';

describe('ReservationStatusFilterComponent', () => {
  let component: ReservationStatusFilterComponent;
  let fixture: ComponentFixture<ReservationStatusFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationStatusFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationStatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
