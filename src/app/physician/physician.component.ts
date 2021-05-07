import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies';
import { PhysicianService } from './physician.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css']
})
export class PhysicianComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, 
    public physicianService: PhysicianService,
    private router: Router) { }
    

  ngOnInit(): void {
    this.physicianService.physician = this.physicianService.getProfile();
    this.physicianService.physicianAc = {
      physician_address:"",
      physician_availability:"",
      physician_email:"",
      physician_id:-1,
      physician_keycloak_id:"",
      physician_keycloak_username:"",
      physician_max_daily:0,
      physician_name:"",
      physician_reg_status:false,
      physician_spec:"",
      physician_time_end:0,
      physician_time_start:0,
      physician_visit_days:"",
      createdAt:"",
      updatedAt:""
    }
    if(!(this.physicianService.physician.sub == null)){
      this.physicianService.getPhysicianAccount(this.physicianService.physician.sub);
      if(this.physicianService.physicianAc.physician_reg_status==true){
        this.router.navigate(['physician/dashboard']);
      }
    }
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );



  logout() {
  this.physicianService.logout();
  }

}
