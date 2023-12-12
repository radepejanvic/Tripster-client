import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegistrationFormService } from '../registration-form.service';
import { Registration, UserType, UserStatus } from '../model/user.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {

  constructor(private service: RegistrationFormService) { }

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password1: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
    userType: new FormControl('GUEST', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
  })

  register(): void {
    const registration: Registration = {
      email: this.registrationForm.value.email || "",
      password: this.registrationForm.value.password1 || "",
      //UserStatus
      //UserType
      //userType: userTypeFromString(),
      userType: UserType[this.registrationForm.value.userType as keyof typeof UserType],
      userStatus: UserStatus[("ACTIVE") as keyof typeof UserStatus],
      name: this.registrationForm.value.name || '',
      surname: this.registrationForm.value.surname || '',
      phone: this.registrationForm.value.phone || '',
      country: this.registrationForm.value.country || '',
      city: this.registrationForm.value.city || '',
      zipCode: this.registrationForm.value.zipCode || '',
      street: this.registrationForm.value.street || '',
      number: this.registrationForm.value.number || ''
    }

    this.service.register(registration).subscribe({
      next: (_) => {
        console.log("Uspesan zahtev!")
      }
    }
    );

  }

  // userTypeFromString(stringVal : string) : UserType {
  //   let actualVal = stringVal || 'GUEST';
  //   return UserType[GUEST];
  // }

}
