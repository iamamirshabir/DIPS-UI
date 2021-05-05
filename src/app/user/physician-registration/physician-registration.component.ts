import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import { Physician } from 'src/app/shared/classes';
import { PhysicianRegistrationService } from './physician-registration.service';

export class VisitDay{
  available: boolean;
  name: string;
}


@Component({
  selector: 'app-physician-registration',
  templateUrl: './physician-registration.component.html',
  styleUrls: ['./physician-registration.component.css']
})
export class PhysicianRegistrationComponent implements OnInit {

  physician: Physician;

  availability :string;

  email = new FormControl('', [Validators.required, Validators.email]);

  name = new FormControl('', [Validators.required]);

  spec = new FormControl('', [Validators.required]);

  regno = new FormControl('', [Validators.required]);

  address = new FormControl('', [Validators.required]);

  visitstart = new FormControl('', [Validators.required]);

  visitend = new FormControl('', [Validators.required]);

  hours : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

  visitdays: VisitDay[] =[
  {name: 'Monday',available: false},
  {name: 'Tuesday',available: false},
  {name: 'Wednesday',available: false},
  {name: 'Thursday',available: false},
  {name: 'Friday',available: false},
  {name: 'Saturday',available: false},]
  constructor(private physicianRegistrationservice: PhysicianRegistrationService) { }

  ngOnInit(): void {
  }

  generateAvailability(){
    this.availability = '';
    this.visitdays.forEach(obj =>{ if(obj.available){ this.availability += '1,' }  else { this.availability += '0,' } });
    this.availability += '0';
  }

   
  registerPhysician(){
    if(this.spec.status == 'VALID' &&  this.email.status == 'VALID' && this.name.status == 'VALID' && this.regno.status == 'VALID'){
      this.physician = new Physician();
      this.physician.physician_name = this.name.value;
      this.physician.physician_spec = this.spec.value;
      this.physician.physician_email = this.email.value;
      this.generateAvailability();
      this.physician.physician_availability = this.availability;
      this.physician.physician_address = this.address.value;
      this.physician.physician_time_start = this.visitstart.value;
      this.physician.physician_time_end = this.visitend.value;
      this.physicianRegistrationservice.AddPhysician(this.physician).subscribe((resp: any)=>
      { 
        this.physician = resp;
        console.log(this.physician);
    }
      )
  }else{
    alert("Something went wrong!")
  }
}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
