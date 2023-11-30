import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../feature-modules/layout/home/home.component';
import { PhotosComponent } from '../../feature-modules/accommodation-info/photos/photos.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },//default route
  { path: 'home', component: HomeComponent },
  { path: 'accommodationInfo', component: PhotosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
