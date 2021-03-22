 import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PhysiciansComponent } from './physicians/physicians.component';
import { PrescriptionComponent } from './prescription/prescription.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patientdetails', component: PatientDetailsComponent },
  { path: 'physicians', component: PhysiciansComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'prescription', component: PrescriptionComponent },
  { path: 'login', component: LoginComponent},  
  { path: '', redirectTo : '/login', pathMatch : 'full' },
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
