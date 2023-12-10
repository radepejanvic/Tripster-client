import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../feature-modules/layout/home/home.component';
import { PhotosComponent } from '../../feature-modules/accommodation-info/photos/photos.component';
import { UserAccountUpdateComponent } from 'src/app/feature-modules/user-account-update/user-account-update/user-account-update.component';
import { AuthGuard } from 'src/app/feature-modules/authorization/guard/auth.guard';
import { LoginComponent } from 'src/app/feature-modules/authorization/login/login.component';
import { FilterPageComponent } from 'src/app/feature-modules/layout/filter-page/filter-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },//default route
  { path: 'home', component: HomeComponent },
  { path: 'accommodationInfo/:id', component: PhotosComponent },
  {path:'login',component:LoginComponent},
  { path: 'updateAccount', component:UserAccountUpdateComponent,canActivate:[AuthGuard], data: {role: ['ROLE_HOST','ROLE_GUEST']}},
  { path: 'filterPage', component:FilterPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
