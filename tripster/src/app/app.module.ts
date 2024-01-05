import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserAccountUpdateModule } from './feature-modules/user-account-update/user-account-update';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './infrastructure/material/material.module';
import { UserRegistrationModule } from './feature-modules/user-registration/user-registration.module';
import { AccommodationInfoModule } from './feature-modules/accommodation-info/accommodation-info.module';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { AuthorizationModule } from './feature-modules/authorization/authorization.module';
import { HttpClientModule } from '@angular/common/http';
import { Interceptor } from './feature-modules/authorization/interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { GoogleMapsModule } from '@angular/google-maps'
import { CalendarModule } from 'primeng/calendar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts'
import { AnalyticsModule } from './feature-modules/analytics/analytics.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    UserRegistrationModule,
    AccommodationInfoModule,
    LayoutModule,
    AuthorizationModule,
    UserAccountUpdateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    GoogleMapsModule,
    CalendarModule,
    ToggleButtonModule,
    NgChartsModule,
    AnalyticsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
