import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostNavbarComponent } from './host-navbar.component';

describe('HostNavbarComponent', () => {
  let component: HostNavbarComponent;
  let fixture: ComponentFixture<HostNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
