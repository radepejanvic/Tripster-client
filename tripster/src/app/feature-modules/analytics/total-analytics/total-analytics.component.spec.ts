import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAnalyticsComponent } from './total-analytics.component';

describe('TotalAnalyticsComponent', () => {
  let component: TotalAnalyticsComponent;
  let fixture: ComponentFixture<TotalAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
