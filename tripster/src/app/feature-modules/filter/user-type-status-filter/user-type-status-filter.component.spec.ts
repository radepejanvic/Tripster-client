import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeStatusFilterComponent } from './user-type-status-filter.component';

describe('UserTypeStatusFilterComponent', () => {
  let component: UserTypeStatusFilterComponent;
  let fixture: ComponentFixture<UserTypeStatusFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTypeStatusFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTypeStatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
