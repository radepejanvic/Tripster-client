import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReviewCardComponent } from './accommodation-review-card.component';

describe('AccommodationReviewCardComponent', () => {
  let component: AccommodationReviewCardComponent;
  let fixture: ComponentFixture<AccommodationReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationReviewCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
