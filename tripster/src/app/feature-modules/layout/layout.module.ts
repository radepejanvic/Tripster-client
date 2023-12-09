import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AccommodationInfoModule } from '../accommodation-info/accommodation-info.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { UserRegistrationModule } from '../user-registration/user-registration.module';
import { UserAccountUpdateModule } from '../user-account-update/user-account-update';
import { UserNavbarComponent } from './navbar/user-navbar/user-navbar.component';
import { AdminNavbarComponent } from './navbar/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    UserNavbarComponent,
    AdminNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccommodationInfoModule,
    AuthorizationModule,
    UserRegistrationModule,
    UserAccountUpdateModule
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
