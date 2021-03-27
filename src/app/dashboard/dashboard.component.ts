import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  hide = true;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
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
  
  logout() {
    Cookie.delete('access_token');
    window.location.href = 'http://localhost:8089';
  }

}
