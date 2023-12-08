import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../feature-modules/layout/home/home.component';
import { PhotosComponent } from '../../feature-modules/accommodation-info/photos/photos.component';
import { UserAccountUpdateComponent } from 'src/app/feature-modules/user-account-update/user-account-update/user-account-update.component';
import { AuthGuard } from 'src/app/feature-modules/authorization/guard/auth.guard';
import { LoginComponent } from 'src/app/feature-modules/authorization/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },//default route
  { path: 'home', component: HomeComponent },
  { path: 'accommodationInfo', component: PhotosComponent },
  {path:'login',component:LoginComponent},
  { path: 'updateAccount', component:UserAccountUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
