import { Component, OnInit } from '@angular/core';
import { Prescription, User } from 'src/app/shared/classes';
import { PrescriptionService } from '../appointments/prescription/prescription.service';
import { PhysicianService } from '../physician.service';

@Component({
  selector: 'app-user-profile',
  providers: [PrescriptionService],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  folders: Prescription[];
  user: User;
  prescriptionLoaded: Promise<boolean>;

  constructor(
    private physicianService: PhysicianService,
    private prescriptionService: PrescriptionService
  ) {
    this.physicianService.selectedUser.subscribe((user) => (this.user = user));
    this.getPrescriptionsByUser(this.user.userac_id);
  }

  ngOnInit(): void {}

  getPrescriptionsByUser(uid: number): void {
    this.prescriptionService
      .getPrescriptionsByUser(uid)
      .subscribe((resp: any) => {
        this.folders = resp._embedded.prescriptionList;
        console.log(this.folders);
      });
  }
}
