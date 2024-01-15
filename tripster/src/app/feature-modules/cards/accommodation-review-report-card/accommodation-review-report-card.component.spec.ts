import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReviewReportCardComponent } from './accommodation-review-report-card.component';

describe('AccommodationReviewReportCardComponent', () => {
  let component: AccommodationReviewReportCardComponent;
  let fixture: ComponentFixture<AccommodationReviewReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationReviewReportCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationReviewReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
