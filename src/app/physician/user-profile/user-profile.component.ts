import { Component, OnInit } from '@angular/core';
import { Prescription, User } from 'src/app/shared/classes';
import { PrescriptionService } from '../appointments/prescription/prescription.service';


@Component({
  selector: 'app-user-profile',
  providers: [PrescriptionService],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  folders: Prescription[] ;
  user : User;
  prescriptionLoaded: Promise<boolean>;

  constructor(private prescriptionService: PrescriptionService) { 
    this.prescriptionService.selectedUser.subscribe(user =>(this.user = user));   
    this.folders = prescriptionService.prescriptions;
  }

  ngOnInit(): void {
  }

  getPrescriptions(uId){
    this.prescriptionService.getPrescriptionsByUser(uId).subscribe((resp: any) =>{
      this.folders = resp._embedded.prescriptionList;
      this.prescriptionLoaded = Promise.resolve(true);
      console.log(this.folders);
    });
  }

}
