import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReservationCardComponent } from './host-reservation-card.component';

describe('HostReservationCardComponent', () => {
  let component: HostReservationCardComponent;
  let fixture: ComponentFixture<HostReservationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostReservationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostReservationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
