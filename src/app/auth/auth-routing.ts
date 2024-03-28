import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';

export const authRoutes: Routes = [
    {
      path: 'login',component: LoginComponent
    },
    { path: '', redirectTo: '/login' , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }