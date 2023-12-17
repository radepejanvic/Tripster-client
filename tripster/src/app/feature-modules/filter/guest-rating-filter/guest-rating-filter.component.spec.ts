import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRatingFilterComponent } from './guest-rating-filter.component';

describe('GuestRatingFilterComponent', () => {
  let component: GuestRatingFilterComponent;
  let fixture: ComponentFixture<GuestRatingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestRatingFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestRatingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
