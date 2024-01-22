import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule, By } from "@angular/platform-browser";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let httpController: HttpTestingController;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();

  });
  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    httpController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance; // ContactComponent test instance
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`form should be invalid`, () => {
    component.registrationForm.controls['email'].setValue('');
    component.registrationForm.controls['password1'].setValue('');
    component.registrationForm.controls['password2'].setValue('');
    component.registrationForm.controls['userType'].setValue('');
    component.registrationForm.controls['name'].setValue('');
    component.registrationForm.controls['surname'].setValue('');
    component.registrationForm.controls['phone'].setValue('');
    component.registrationForm.controls['country'].setValue('');
    component.registrationForm.controls['city'].setValue('');
    component.registrationForm.controls['zipCode'].setValue('');
    component.registrationForm.controls['street'].setValue('');
    component.registrationForm.controls['number'].setValue('');

    expect(component.registrationForm.valid).toBeFalsy();
  });

  it(`form should be valid`, () => {
    component.registrationForm.controls['email'].setValue("t@gmail.com");
    component.registrationForm.controls['password1'].setValue('11111');
    component.registrationForm.controls['password2'].setValue('11111');
    component.registrationForm.controls['userType'].setValue('GUEST');
    component.registrationForm.controls['name'].setValue('TEST');
    component.registrationForm.controls['surname'].setValue('TEST');
    component.registrationForm.controls['phone'].setValue('0637777777');
    component.registrationForm.controls['country'].setValue('Serbia');
    component.registrationForm.controls['city'].setValue('Novi Sad');
    component.registrationForm.controls['zipCode'].setValue('21000');
    component.registrationForm.controls['street'].setValue('Pavla Papa');
    component.registrationForm.controls['number'].setValue('12');
    expect(component.registrationForm.valid).toBeTruthy();
  });

  it(`shouldn't call the onSubmit method`, () => {
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button.mybtn')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });
});
