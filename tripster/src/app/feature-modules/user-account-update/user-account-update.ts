import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserAccountUpdateComponent } from "./user-account-update/user-account-update.component";

@NgModule({
    declarations: [
        UserAccountUpdateComponent
    ],
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        UserAccountUpdateComponent
    ]
})
export class UserAccountUpdateModule {}