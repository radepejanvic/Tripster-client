import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationFormService } from '../registration-form.service';
import { PersonCRUD, UserType, UserStatus } from '../model/user.model';
import { AuthorizationService } from '../../authorization/authorization.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {

  @Output() registrationSubmit = new EventEmitter<null>(); 

  constructor(private service: RegistrationFormService, private router: Router, private authService: AuthorizationService) { }

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password1: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
    userType: new FormControl('GUEST', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5,}$')]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
  })

  public errorText: string = '';

  register(): void {
    this.errorText = '';
    if(this.validateForm()) {
      const registration: PersonCRUD = {
        email: this.registrationForm.value.email || "",
        password: this.registrationForm.value.password1 || "",
        userType: UserType[this.registrationForm.value.userType as keyof typeof UserType],
        status: UserStatus["NEW" as keyof typeof UserStatus],
        name: this.registrationForm.value.name || '',
        surname: this.registrationForm.value.surname || '',
        phone: this.registrationForm.value.phone || '',
        country: this.registrationForm.value.country || '',
        city: this.registrationForm.value.city || '',
        zipCode: this.registrationForm.value.zipCode || '',
        street: this.registrationForm.value.street || '',
        number: this.registrationForm.value.number || ''
      }
      
      this.service.register(registration).subscribe(
        (response: string) => {
          this.registrationSubmit.emit();
          document.getElementById("close-btn")?.click();
          this.router.navigate(["home"]);
          this.router.navigate(["login"]);
          
        },
        (error: string) => {
          console.log('User name exists.');
          this.errorText = 'User name exists.'
        },
      
      );
    }

  }

  private validateForm(): boolean{
     if (this.registrationForm.value.password1 != this.registrationForm.value.password2){
      this.errorText = "Passwords do not match.";
      return false;
    }
    if (this.registrationForm.value.password1) {
      if (this.registrationForm.value.password1.length < 5) {
        this.errorText = "Password too short.";
        return false;
      }
    }
    if(!this.registrationForm.get("email")?.valid){
      this.errorText = "Email is not valid.";
      return false;
    }
    if (!this.registrationForm.valid){
      this.errorText = "Not all fields submitted."
      return false;
    }
    return true;
  }

}
