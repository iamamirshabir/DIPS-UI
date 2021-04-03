import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Physician } from 'src/app/shared/classes';
import { PhysicianDialogComponent } from './physician-dialog/physician-dialog.component';
import { PhysiciansService } from './physicians.service';


@Component({
  selector: 'app-physicians',
  templateUrl: './physicians.component.html',
  styleUrls: ['./physicians.component.css']
})
export class PhysiciansComponent implements OnInit {

  specControl = new FormControl();

  physicians: Physician[];
  selectedSpec: string = 'Primary Care'

  specs :string[] =[]

  available: string;
  name: string;

  constructor(public dialog: MatDialog,private physicianService: PhysiciansService) {
    this.physicians = physicianService.physicians;
   }

  ngOnInit(): void {
    this.physicians.forEach(obj => {if(!this.specs.includes(obj.spec)) {this.specs.push(obj.spec)}});
  }

  openDialog( drName:string): void {
    const dialogRef = this.dialog.open(PhysicianDialogComponent, {
      width: '450px',
      data: {name: drName, available: "On Mon, Tue, Fri"}
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