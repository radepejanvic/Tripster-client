import { Component } from '@angular/core';

@Component({
    selector: 'app-user-account-update',
    templateUrl: './user-account-update.component.html',
    styleUrl: './user-account-update.component.css'
})
export class UserAccountUpdateComponent {
    email: String = "petar@gmail.com";
    name: String = "Petar";
    surname: String = "Petrovic";
    phone: String = "065123456";
    street: String = "Jevrejska";
    number: String = "23";
    city: String = "Beograd";
    zipCode : String = "11000";
    country : String = "Serbia";

}