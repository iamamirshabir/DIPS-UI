import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusComponent } from '../user/contactus/contactus.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrescriptionComponent } from './appointments/prescription/prescription.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PhysicianComponent } from './physician.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: PhysicianComponent,
    children: [
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'prescription', component: PrescriptionComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'contactus', component: ContactusComponent },
      { path: 'userprofile', component: UserProfileComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicianRoutingModule {}
