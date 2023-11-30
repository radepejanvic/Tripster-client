import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { UserAccountUpdateModule } from './feature-modules/user-account-update/user-account-update';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './infrastructure/material/material.module';
import { UserRegistrationModule } from './feature-modules/user-registration/user-registration.module';
import { AccommodationInfoModule } from './feature-modules/accommodation-info/accommodation-info.module';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { AuthorizationModule } from './feature-modules/authorization/authorization.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UserRegistrationModule,
    AccommodationInfoModule,
    LayoutModule,
    AuthorizationModule,
    ReactiveFormsModule,
    UserAccountUpdateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
