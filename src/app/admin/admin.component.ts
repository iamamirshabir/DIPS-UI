import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Physician } from '../shared/classes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  physicians: Physician[];
  physiciansLoaded: Promise<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPhysicians();
  }

  getPhysicians() {
    this.adminService.getUnregisteredPhysicians().subscribe((resp: any) => {
      this.physicians = resp._embedded.physicianList;
      this.physiciansLoaded = Promise.resolve(true);
      console.log(this.physicians);
    });
  }

  updateRegistered(pId: number, p: Physician) {
    p.physician_reg_status = true;
    this.adminService.updateRegStatus(pId, p).subscribe((resp: any) => {
      this._snackBar.open(
        'Physician has been registered successfully ',
        'Okay'
      );
      console.log(resp);
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout() {}
}
