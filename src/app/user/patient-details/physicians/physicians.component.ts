import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { PhysicianDialogComponent } from './physician-dialog/physician-dialog.component';

export interface Doctor{
  name: string;
  spec: string;
  description: string;
}


@Component({
  selector: 'app-physicians',
  templateUrl: './physicians.component.html',
  styleUrls: ['./physicians.component.css']
})
export class PhysiciansComponent implements OnInit {

  specControl = new FormControl();

  doctors: Doctor[]=[{name: 'Aftab Ahmed', spec: 'Pediatrician', description:'Five years working experinence. Ex-Medical Officer Tehsil Headquarter Hospital, Sangarh.'},
  {name: 'Minhas Rasheed', spec: 'Primary Care', description:'Ten years working experinence. Ex-Medical Officer Tehsil Headquarter Hospital, Sangarh.'},
  {name: 'Moeez Ali', spec: 'General Practitioner', description:'Five years working experinence. Ex-Medical Officer Tehsil Headquarter Hospital, Sangarh.'},
  {name: 'Aftab Ahmed', spec: 'Pediatrician', description:'Five years working experinence. Ex-Medical Officer Tehsil Headquarter Hospital, Sangarh.'},
  {name: 'Minhas Rasheed', spec: 'Primary Care', description:'Ten years working experinence. Ex-Medical Officer Tehsil Headquarter Hospital, Sangarh.'},
  {name: 'Moeez Ali', spec: 'General Practitioner', description:'Five years working experinence. Ex-Medical Officer Tehsil Headquarter Hospital, Sangarh.'}

]
  selectedSpec: string = 'Primary Care'

  specs :string[] =[]

  available: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.doctors.forEach(obj => {if(!this.specs.includes(obj.spec)) {this.specs.push(obj.spec)}});
    ;
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