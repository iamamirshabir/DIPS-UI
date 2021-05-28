import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/physician/appointments/prescription/prescription.service';
import { Prescription, User } from 'src/app/shared/classes';
import { UserService } from '../user.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  providers: [PrescriptionService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  folders: Prescription[];
  user: User;

  constructor(
    private prescriptionService: PrescriptionService,
    private profileService: ProfileService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.userAc;
    this.getPrescriptionsByUser(this.user.userac_id);
  }

  getUser(id: number): void {
    this.profileService.getUser(id).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
    });
  }

  getPrescriptionsByUser(uid: number): void {
    this.prescriptionService
      .getPrescriptionsByUser(uid)
      .subscribe((resp: any) => {
        this.folders = resp._embedded.prescriptionList;
        console.log(this.folders);
      });
  }

  generatePdf(prescription: Prescription) {
    this.prescriptionService.generatePdf(prescription);
  }
}
