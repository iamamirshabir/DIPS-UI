import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/physician/appointments/prescription/prescription.service';
import { Prescription, User } from 'src/app/shared/classes';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  providers: [PrescriptionService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  folders: Prescription[] ;
  user : User;
  
  constructor(private prescriptionService: PrescriptionService, private profileService: ProfileService ) {
    }

  ngOnInit(): void {
    this.getUser('1');
    this.getPrescriptionsByUser('1');
  }

  getUser(id: string ): void {
    this.profileService.getUser(id).subscribe((resp: any) =>{
      this.user = resp;
      console.log(this.user);
    })
  }

  getPrescriptionsByUser(uid: string): void {
    this.prescriptionService.getPrescriptionsByUser(uid).subscribe((resp: any) =>{
      this.folders = resp._embedded.prescriptionList;
      console.log(this.folders);
      })
  }

  generatePdf(prescription: Prescription){
    this.prescriptionService.generatePdf(prescription);
  }

}
