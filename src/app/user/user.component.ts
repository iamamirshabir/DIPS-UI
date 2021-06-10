import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  name = new FormControl('', [Validators.required]);

  date = new FormControl('', [Validators.required]);

  phone = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9 ]{11}'),
  ]);

  minDate: Date;
  maxDate: Date;

  dateNow: Date;
  progValue = 20;

  isPhysician: false;

  userLoaded: Promise<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    private router: Router
  ) {
    setInterval(() => {
      this.dateNow = new Date();
    }, 1000);
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.userService.user = this.userService.getProfile();
    this.userService.userAc = {
      updatedAt: '',
      createdAt: '',
      userac_name: '',
      userac_dob: null,
      userac_reg: false,
      userac_email: '',
      userac_keycloak_id: '',
      userac_id: -1,
      userac_keycloak_username: '',
      userac_mobile: 0,
    };
    if (!(this.userService.user.sub == null)) {
      this.getUserAccount(this.userService.user.sub);
      this.name.setValue(
        this.userService.user.given_name +
          ' ' +
          this.userService.user.family_name
      );
      this.email.setValue(this.userService.user.email);
      
    }
  }

  logout() {
    this.userService.logout();
  }

  getUserAccount(id: string): boolean {
    
    this.userService.getUserByKeycloak(id).subscribe((resp: any) => {
      this.userService.userAc = resp;      
      this.router.initialNavigation();
      this.userLoaded = Promise.resolve(true);
      //this.router.navigate(['user/dashboard']);
      console.log(this.userService.userAc);
      return true;
    });
    return false;
  }

  registerUser() {
    if (
      this.date.status == 'VALID' &&
      this.phone.status == 'VALID' &&
      this.email.status == 'VALID' &&
      this.name.status == 'VALID'
    ) {
      this.userService.userAc = new User();
      this.userService.userAc.userac_name = this.name.value;
      this.userService.userAc.userac_email = this.email.value;
      this.userService.userAc.userac_mobile = this.phone.value;
      this.userService.userAc.userac_keycloak_username = this.userService.user.username;
      this.userService.userAc.userac_keycloak_id = this.userService.user.sub;
      this.userService.userAc.userac_dob = this.date.value;
      this.userService.userAc.userac_reg = true;
      if (this.userService.userReg == false) {
        this.userService
          .AddUser(this.userService.userAc)
          .subscribe((resp: any) => {
            this.userService.userReg = true;
            this.router.navigate(['user/dashboard']);
            this.userService.userAc = resp;
            this.userLoaded = Promise.resolve(true);
          });
      }
    } else {
      alert('Fill your details first!');
    }
  }

  progFunction(): void {
    if (this.name.status == 'VALID') {
      this.progValue = 40;
    }
    if (this.email.status == 'VALID' && this.name.status == 'VALID') {
      this.progValue = 60;
    }
    if (
      this.phone.status == 'VALID' &&
      this.email.status == 'VALID' &&
      this.name.status == 'VALID'
    ) {
      this.progValue = 80;
    }
    if (
      this.date.status == 'VALID' &&
      this.phone.status == 'VALID' &&
      this.email.status == 'VALID' &&
      this.name.status == 'VALID'
    ) {
      this.progValue = 95;
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
