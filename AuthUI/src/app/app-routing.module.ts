import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashComponent } from './dash/dash.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo:"/login", pathMatch:"full"},
  {path:'login',component:LoginComponent,},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashComponent,canActivate:[AuthGuard]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
