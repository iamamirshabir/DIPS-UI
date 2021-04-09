import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { KeycloakService } from 'keycloak-angular';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies';
import { User } from '../shared/classes';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  name = new FormControl('', [Validators.required]);

  date = new FormControl('', [Validators.required]);

  phone = new FormControl('', [Validators.required, Validators.email]);

  minDate: Date;
  maxDate: Date;

  dateNow:Date; 

  route: ActivatedRoute;
  user;
  userAc: User;

  progValue=20;

  constructor(private breakpointObserver: BreakpointObserver,
    protected keycloak: KeycloakService,
    private userService: UserService,
    private router: Router) {
      setInterval(() => {
        this.dateNow = new Date()
      }, 1000)
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 1);
    this.maxDate = new Date();
   }

  ngOnInit(): void {
    //this.user = this.getProfile();
    //if(!(this.user.email == null)){
    //  this.UserAc = new User();
    //  this.getUserAccount(this.user.email);
    //}
    //if(this.userAc.userac_reg == true)
     if(this.userAc == null){
      this.userAc = new User();
      this.userAc.userac_reg = false;
    }
    
  }

  registerUser(){
    if(this.date.status == 'VALID' && this.phone.status == 'VALID' && this.email.status == 'VALID' && this.name.status == 'VALID'){
    this.userAc.userac_name = this.name.value;
    this.userAc.userac_email = this.email.value;
    this.userAc.userac_mobile = this.phone.value;
    this.userAc.userac_keycloak_username = "temp";
    this.userAc.userac_dob = this.date.value;
    if(this.userAc.userac_reg == false){
      this.userService.AddUser(this.userAc).subscribe((resp: Response)=>
      {if(resp.status ==201){
        this.userAc.userac_reg = true;        
        }
      });
    }
    }else{
      alert("Fill your details first!")
    }
  }

  getUserAccount(email: string):void{
    this.userService.getUserByEmail(email).subscribe((resp: any) =>{
      this.userAc = resp;
      console.log(this.userAc);
    });
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
  getProfile(){
    try{
      let userDetails = this.keycloak.getKeycloakInstance().idTokenParsed;
      return userDetails;
  } catch(e) {
    console.log("Could not get:", e)
    return undefined;
  }
}

logout(){
 this.keycloak.logout(); 
}



}
