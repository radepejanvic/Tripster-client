import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountUpdateService } from '../user-account-update.service';
import { PersonCRUD, UserStatus, UserType } from '../../user-registration/model/user.model';
import { PersonUpdate } from '../model/user-update.model';

@Component({
    selector: 'app-user-account-update',
    templateUrl: './user-account-update.component.html',
    styleUrl: './user-account-update.component.css'
})
export class UserAccountUpdateComponent {

    constructor(private service: UserAccountUpdateService) {}

    accountUpdateForm = new FormGroup({
        //Email mora ostati nepromenjiv
        //email: new FormControl('', [Validators.email]),
        password1: new FormControl('ww6kPYJrr0d1A8D', [Validators.required]),
        password2: new FormControl('ww6kPYJrr0d1A8D', [Validators.required]),
        name: new FormControl('Jane', [Validators.required]),
        surname: new FormControl('Glassford', [Validators.required]),
        phone: new FormControl('980-847-8405', [Validators.required]),
        street: new FormControl('32583 Strosin Run', [Validators.required]),
        number: new FormControl('401', [Validators.required]),
        city: new FormControl('Niagara Falls', [Validators.required]),
        zipCode : new FormControl('5185', [Validators.required]),
        country : new FormControl('Heard Island and McDonald Islands', [Validators.required])
    })

    public errorText: string = '';

    showPasswordFields(): void {
        document.getElementById("passwordFieldsDiv")?.classList.toggle("shown") 
    }

    updateProfile(): void {
        this.errorText = '';
        if(this.validateForm()) {
            const update: PersonUpdate = {
                id: 11,
                adressId: 11,
                email: "vetkonetko@gmail.com",
                password: this.accountUpdateForm.value.password1 || "",
                userType: UserType["GUEST" as keyof typeof UserType],
                status: UserStatus["ACTIVE" as keyof typeof UserStatus],
                name: this.accountUpdateForm.value.name || '',
                surname: this.accountUpdateForm.value.surname || '',
                phone: this.accountUpdateForm.value.phone || '',
                country: this.accountUpdateForm.value.country || '',
                city: this.accountUpdateForm.value.city || '',
                zipCode: this.accountUpdateForm.value.zipCode || '',
                street: this.accountUpdateForm.value.street || '',
                number: this.accountUpdateForm.value.number || ''
            }
            console.log(update);
            this.service.updateUser(update).subscribe(
                (response: PersonUpdate) => {
                    console.log(response);
                    alert("Account updated.")
                    //document.getElementById("account-update-show");
                }
            );
        }

    }

    deleteProfile(): void {
        this.errorText = '';
    }

    private validateForm(): boolean {
        if(this.accountUpdateForm.value.password1 != this.accountUpdateForm.value.password2) {
            this.errorText = "Passwords do not match.";
            return false;
        }
        if(this.accountUpdateForm.value.password1){
            if (this.accountUpdateForm.value.password1.length < 5) {
                this.errorText = "Password too short.";
                return false;
            }
        }
        if(!this.accountUpdateForm.valid) {
            this.errorText = "Not all fields submitted."
            return false;
        }
        return true;
    }

}