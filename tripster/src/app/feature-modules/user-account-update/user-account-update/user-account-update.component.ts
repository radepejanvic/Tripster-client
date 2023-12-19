import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAccountUpdateService } from '../user-account-update.service';
import { PersonCRUD, UserStatus, UserType } from '../../user-registration/model/user.model';
import { DeleteStatus, PersonUpdate } from '../model/user-update.model';
import { AuthorizationService } from '../../authorization/authorization.service';
import { Observable } from 'rxjs';
import { data, error } from 'jquery';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-account-update',
    templateUrl: './user-account-update.component.html',
    styleUrl: './user-account-update.component.css'
})
export class UserAccountUpdateComponent implements OnInit {

    constructor(private service: UserAccountUpdateService,
                private authService: AuthorizationService,
                private router: Router ) {}

    private user: PersonUpdate;

    accountUpdateForm: FormGroup = new FormGroup({
        password1: new FormControl('123123'),
        password2: new FormControl(''),
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        zipCode : new FormControl('', [Validators.required]),
        country : new FormControl('', [Validators.required])
    });
    public email: string = '';

    ngOnInit(): void {
       
        this.service.getUser(this.authService.getPersonId()).subscribe(
            (data: PersonUpdate) => {
                this.user = data;
                this.email = data.email;
                this.accountUpdateForm.patchValue({
                password1: data.password, 
                password2: data.password,
                name: data.name,
                surname: data.surname,
                phone: data.phone,
                street: data.street,
                number: data.number,
                city: data.city,
                zipCode : data.zipCode,
                country : data.country
                })
            },
            (error: any) => {
                console.log("Error fetching data.", error);
            }
        )
    }    

    public errorText: string = '';

    showPasswordFields(): void {
        document.getElementById("passwordFieldsDiv")?.classList.toggle("shown") 
    }

    updateProfile(): void {
        this.errorText = '';
        if(this.validateForm()) {
            const update: PersonUpdate = {
                id: this.authService.getPersonId(),
                
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
            //console.log(update);
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
        this.service.deleteUser(this.authService.getUserId()).subscribe(
            (response: DeleteStatus) => {
                console.log(response);
                switch (response) {
                    case DeleteStatus.SUCCESS:
                        this.errorText = 'Account deleted';
                        this.clearLocalStorage();
                        this.router.navigate(["home"]);
                        this.clearLocalStorage();
                        location.reload();
                        //funkcije za brisanje naloga iz lokal storidza
                        break;
                    case DeleteStatus.HAS_RESERVATIONS:
                        this.errorText = 'You have some reservations left.';
                        break;
                    case DeleteStatus.NO_USER_FOUND:
                        this.errorText = 'User does not exist.';
                        break;

                }
            }
        )
    }

    //HELPER FUNCTIONS : 

    private validateForm(): boolean {
        if(this.accountUpdateForm.value.password1 != this.accountUpdateForm.value.password2) {
            this.errorText = "Passwords do not match.";
            return false;
        }
        //Napraviti password update kasnije
        // verovatno ce trebati zaseban DTO
        // if(this.accountUpdateForm.value.password1){
        //     if (this.accountUpdateForm.value.password1.length < 5) {
        //         this.errorText = "Password too short.";
        //         return false;
        //     }
        // }
        if(!this.accountUpdateForm.valid) {
            this.errorText = "Not all fields submitted."
            return false;
        }
        return true;
    }

    private clearLocalStorage(): void {
        localStorage.removeItem('personID');
        localStorage.removeItem('userID');
        localStorage.removeItem('user');
    }

}