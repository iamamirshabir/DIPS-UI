import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/physician/appointments/prescription/prescription.service';
import { Prescription, User } from 'src/app/shared/classes';

@Component({
  selector: 'app-profile',
  providers: [PrescriptionService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  folders: Prescription[] ;
  user : User;
  
  constructor(private prescriptionService: PrescriptionService) { 
    this.folders = prescriptionService.prescriptions;
    this.user = new User()
  }

  ngOnInit(): void {
  }

}
