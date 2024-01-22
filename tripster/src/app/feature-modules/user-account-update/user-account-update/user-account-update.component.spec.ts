import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAccountUpdateComponent } from './user-account-update.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserAccountUpdateComponent', () => {
  let component: UserAccountUpdateComponent;
  let fixture: ComponentFixture<UserAccountUpdateComponent>;
  let httpController: HttpTestingController;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAccountUpdateComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountUpdateComponent);
    httpController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`form should be invalid`, () => {
    component.accountUpdateForm.controls['password1'].setValue('');
    component.accountUpdateForm.controls['password2'].setValue('');
    component.accountUpdateForm.controls['name'].setValue('');
    component.accountUpdateForm.controls['surname'].setValue('');
    component.accountUpdateForm.controls['phone'].setValue('');
    component.accountUpdateForm.controls['country'].setValue('');
    component.accountUpdateForm.controls['city'].setValue('');
    component.accountUpdateForm.controls['zipCode'].setValue('');
    component.accountUpdateForm.controls['street'].setValue('');
    component.accountUpdateForm.controls['number'].setValue('');

    expect(component.accountUpdateForm.valid).toBeFalsy();
  });

  it(`form should be valid`, () => {
    component.accountUpdateForm.controls['password1'].setValue('testtest');
    component.accountUpdateForm.controls['password2'].setValue('testtest');
    component.accountUpdateForm.controls['name'].setValue('Rade');
    component.accountUpdateForm.controls['surname'].setValue('Pejanovic');
    component.accountUpdateForm.controls['phone'].setValue('0694026700');
    component.accountUpdateForm.controls['country'].setValue('Srbija');
    component.accountUpdateForm.controls['city'].setValue('Novi Sad');
    component.accountUpdateForm.controls['zipCode'].setValue('21000');
    component.accountUpdateForm.controls['street'].setValue('Dunavska');
    component.accountUpdateForm.controls['number'].setValue('10');

    expect(component.accountUpdateForm.valid).toBeTruthy();
  });

  it(`shouldn't call the onSubmit method`, () => {
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button.update')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });
});
