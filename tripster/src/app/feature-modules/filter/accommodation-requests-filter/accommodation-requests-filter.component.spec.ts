import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationRequestsFilterComponent } from './accommodation-requests-filter.component';

describe('AccommodationRequestsFilterComponent', () => {
  let component: AccommodationRequestsFilterComponent;
  let fixture: ComponentFixture<AccommodationRequestsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationRequestsFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationRequestsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
