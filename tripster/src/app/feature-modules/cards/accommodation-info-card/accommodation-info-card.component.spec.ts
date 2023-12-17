import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationInfoCardComponent } from './accommodation-info-card.component';

describe('AccommodationInfoCardComponent', () => {
  let component: AccommodationInfoCardComponent;
  let fixture: ComponentFixture<AccommodationInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationInfoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
