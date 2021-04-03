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

  constructor(private prescriptionService: PrescriptionService) { 
    this.folders = prescriptionService.prescriptions;
    this.user = new User()
  }

  ngOnInit(): void {
  }

}
