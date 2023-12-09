import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCrudComponent } from './accommodation-crud.component';

describe('AccommodationCrudComponent', () => {
  let component: AccommodationCrudComponent;
  let fixture: ComponentFixture<AccommodationCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
