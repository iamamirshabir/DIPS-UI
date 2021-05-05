import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PhysiciansComponent } from './patient-details/physicians/physicians.component';
import { PhysicianRegistrationComponent } from './physician-registration/physician-registration.component';
import { ProfileComponent } from './profile/profile.component';

import { UserComponent } from './user.component';

const routes: Routes = [{ path: '', component: UserComponent,
 children: [
  { path: 'diagnosis', component: PatientDetailsComponent },
  { path: 'physicians', component: PhysiciansComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'physicianregistration', component: PhysicianRegistrationComponent }]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
