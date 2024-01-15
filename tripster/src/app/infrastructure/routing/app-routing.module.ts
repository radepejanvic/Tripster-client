import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../feature-modules/layout/home/home.component';
import { PhotosComponent } from '../../feature-modules/accommodation-info/photos/photos.component';
import { UserAccountUpdateComponent } from 'src/app/feature-modules/user-account-update/user-account-update/user-account-update.component';
import { AuthGuard } from 'src/app/feature-modules/authorization/guard/auth.guard';
import { LoginComponent } from 'src/app/feature-modules/authorization/login/login.component';
import { FilterPageComponent } from 'src/app/feature-modules/layout/filter-page/filter-page.component';
import { AccommodationCrudComponent } from 'src/app/feature-modules/accommodation-info/accommodation-crud/accommodation-crud.component';
import { AnalyticsComponent } from 'src/app/feature-modules/analytics/analytics/analytics.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //default route
  { path: 'home', component: HomeComponent },
  { path: 'accommodationInfo/:id', component: PhotosComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'updateAccount',
    component: UserAccountUpdateComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_HOST', 'ROLE_GUEST'] },
  },
  { path: 'filterPage', component: FilterPageComponent },
  {
    path: 'myAccommodation',
    component: FilterPageComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_HOST'] },
  },
  {
    path: 'guest/reservation',
    component: FilterPageComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_GUEST'] },
  },
  {
    path: 'accommodationReviews',
    component: FilterPageComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_ADMIN'] },
  },
  {
    path: 'accommodationReportReviews',
    component: FilterPageComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_ADMIN'] },
  },
  {
    path: 'userReportReviews',
    component: FilterPageComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_ADMIN'] },
  },
  {
    path: 'userReport',
    component: FilterPageComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_ADMIN'] },
  },
  {
    path: 'guest/favoriteAccommodation',
    component: FilterPageComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_GUEST'] },
  },
  {
    path: 'host/reservation',
    component: FilterPageComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_HOST'] },
  },
  {
    path: 'accommodationRequests',
    component: FilterPageComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_ADMIN'] },
  },
  { path: 'accommodationInfo', component: PhotosComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'updateAccount',
    component: UserAccountUpdateComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_HOST', 'ROLE_GUEST'] },
  },

  {
    path: 'addAccommodation',
    component: AccommodationCrudComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_HOST'] },
  },

  {
    path: 'updateAccommodation/:id',
    component: AccommodationCrudComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_HOST'] },
  },

  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
    data: { role: ['ROLE_HOST'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
