import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PrescriptionComponent } from './appointments/prescription/prescription.component';

import { PhysicianComponent } from './physician.component';

const routes: Routes = [{ path: '', component: PhysicianComponent,
children: [{ path: 'appointments', component: AppointmentsComponent },
{ path: 'prescription', component: PrescriptionComponent }] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianRoutingModule { }
