import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualAnalyticsComponent } from './annual-analytics.component';

describe('AnnualAnalyticsComponent', () => {
  let component: AnnualAnalyticsComponent;
  let fixture: ComponentFixture<AnnualAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnualAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
