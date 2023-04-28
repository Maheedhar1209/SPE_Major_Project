import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { PopupmoviedetailsComponent } from './components/popupmoviedetails/popupmoviedetails.component';

const routes: Routes = [{path:'', component:HomePageComponent},{path:'login',component:LoginComponent},{path:'popup',component:PopupmoviedetailsComponent},{path:'admin-dashboard',component:AdmindashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
