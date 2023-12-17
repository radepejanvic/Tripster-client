import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationRequestCardComponent } from './accommodation-request-card.component';

describe('AccommodationRequestCardComponent', () => {
  let component: AccommodationRequestCardComponent;
  let fixture: ComponentFixture<AccommodationRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationRequestCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
