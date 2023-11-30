import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AccommodationInfoModule } from '../accommodation-info/accommodation-info.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { UserRegistrationModule } from '../user-registration/user-registration.module';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccommodationInfoModule,
    AuthorizationModule,
    UserRegistrationModule
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
