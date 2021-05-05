import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';


import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/classes';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  name = new FormControl('', [Validators.required]);

  date = new FormControl('', [Validators.required]);

  phone = new FormControl('', [Validators.required, Validators.pattern('[0-9 ]{11}')]);

  minDate: Date;
  maxDate: Date;

  dateNow:Date; 
  progValue=20;

  isPhysician: false;

  userLoaded: Promise<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    private router: Router) {
      setInterval(() => {
        this.dateNow = new Date()
      }, 1000)
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 1);
    this.maxDate = new Date();
   }

  ngOnInit(): void {
    this.userService.user = this.userService.getProfile();
    if(!(this.userService.user.email == null)){
      this.userService.getUserAccount(this.userService.user.email);
    }
    if(this.userService.userAc == null){
      //this.userService.userAc.userac_reg = false;
    }
  }

  logout(){
    this.userService.logout();
  }

  registerUser(){
    if(this.date.status == 'VALID' && this.phone.status == 'VALID' && this.email.status == 'VALID' && this.name.status == 'VALID'){
    this.userService.userAc = new User();
    this.userService.userAc.userac_name = this.name.value;
    this.userService.userAc.userac_email = this.email.value;
    this.userService.userAc.userac_mobile = this.phone.value;
    this.userService.userAc.userac_keycloak_username = this.userService.user.username;
    this.userService.userAc.userac_keycloak_id = this.userService.user.id;
    this.userService.userAc.userac_dob = this.date.value;
    this.userService.userAc.userac_reg = false;
    if(this.userService.userAc.userac_reg == false){
      this.userService.AddUser(this.userService.userAc).subscribe((resp: any)=>
      { 
        this.userService.userAc.userac_reg = true;  
        this.userService.userAc = resp;
        this.userLoaded = Promise.resolve(true);  
      });
    }
    }else{
      alert("Fill your details first!")
    }
  }

  

  progFunction():void{
    if(this.name.status == 'VALID'){
      this.progValue = 40;
     }
     if(this.email.status == 'VALID' && this.name.status == 'VALID'){
      this.progValue = 60;
     }
     if(this.phone.status == 'VALID' && this.email.status == 'VALID' && this.name.status == 'VALID'){
      this.progValue = 80;
     } 
      if(this.date.status == 'VALID' && this.phone.status == 'VALID' && this.email.status == 'VALID' && this.name.status == 'VALID'){
        this.progValue = 95;
       
      }
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
}
