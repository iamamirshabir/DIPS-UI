import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  providers: [AppService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isLoggedIn = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  credentials = {username: '', password: ''};

  hide = true;

  constructor(private router: Router, private _service: AppService) { }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login() {
    window.location.href = 
      this._service.AuthUri +'/auth/realms/dips/protocol/openid-connect/auth?response_type=code&scope=openid%20write%20read&client_id=' + 
         this._service.clientId + '&redirect_uri='+ this._service.redirectUri;
    }
 

  ngOnInit(): void {
    this.isLoggedIn = this._service.checkCredentials();    
    let i = window.location.href.indexOf('code');
    if(!this.isLoggedIn && i != -1) {
      this._service.retrieveToken(window.location.href.substring(i + 5));
  }
}

}
