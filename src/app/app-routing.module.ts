 import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientDetailsComponent } from './user/patient-details/patient-details.component';

import { UserComponent } from './user/user.component';
import { PhysicianComponent } from './physician/physician.component';
import { PhysiciansComponent } from './user/patient-details/physicians/physicians.component';
import { AppointmentsComponent } from './physician/appointments/appointments.component';
import { PrescriptionComponent } from './physician/appointments/prescription/prescription.component';
import { UserProfileComponent } from './physician/user-profile/user-profile.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: 'user', component: UserComponent ,
  children: [
    { path: 'patientdetails', component: PatientDetailsComponent },
    { path: 'physicians', component: PhysiciansComponent },
    { path: 'profile', component: ProfileComponent }
  ]},
  { path: 'physician', component: PhysicianComponent ,
  children: [
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'prescription', component: PrescriptionComponent },
    { path: 'user-profile', component: UserProfileComponent }
  ]},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo : '/login', pathMatch : 'full' },
];;

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
