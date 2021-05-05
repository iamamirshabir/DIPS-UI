import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Physician } from 'src/app/shared/classes';
import { PhysicianDialogComponent } from './physician-dialog/physician-dialog.component';
import { PhysiciansService } from './physicians.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-physicians',
  templateUrl: './physicians.component.html',
  styleUrls: ['./physicians.component.css']
})
export class PhysiciansComponent implements OnInit {

  specControl = new FormControl();

  physicians: Physician[];
  physiciansLoaded: Promise<boolean>;
  selectedSpec: string = 'primary care'

  specs :string[]=[];

  available: string;
  name: string;

  constructor(public dialog: MatDialog,private route: ActivatedRoute,private physicianService: PhysiciansService) {

  }

  ngOnInit(): void {
    this.getPhysicians();
    
  }

  getPhysicians(){
    this.physicianService.getPhysicians().subscribe((resp: any) =>{
      this.physicians = resp._embedded.physicianList;
      this.physicians.forEach(obj => {if(!this.specs.includes(obj.physician_spec)) {this.specs.push(obj.physician_spec)}});    
      this.route.queryParams.subscribe(
        params => {
          this.selectedSpec =  params.spec;
        });
      this.physiciansLoaded = Promise.resolve(true);
      console.log(this.physicians);
    });
  }

  openDialog( pName:string, pid: number, pavailability: string, ptime_start: number, ptime_end: number): void {
    const dialogRef = this.dialog.open(PhysicianDialogComponent, {
      width: '450px',
      data: {name: pName, id: pid, available: pavailability, time_start: ptime_start, time_end: ptime_end}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.available = result;
    });
  }
  
  filterPhysicians(){
    this.selectedSpec=this.specControl.value;
  }

}