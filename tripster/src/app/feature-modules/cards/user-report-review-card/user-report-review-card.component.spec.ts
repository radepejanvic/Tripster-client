import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportReviewCardComponent } from './user-report-review-card.component';

describe('UserReportReviewCardComponent', () => {
  let component: UserReportReviewCardComponent;
  let fixture: ComponentFixture<UserReportReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserReportReviewCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserReportReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
