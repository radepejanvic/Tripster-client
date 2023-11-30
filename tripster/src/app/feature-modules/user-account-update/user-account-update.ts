import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserAccountUpdateComponent } from "./user-account-update/user-account-update.component";

@NgModule({
    declarations: [
        UserAccountUpdateComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        UserAccountUpdateComponent
    ]
})
export class UserAccountUpdateModule {}