import { Component, OnInit } from '@angular/core';

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

  doctors: Doctor[]=[{name: 'Aftab Ahmed', spec: 'Pediatrician', description:'Five years working experinence. Ex-Medical Officer Tehsil Headquarter Hospital, Sangarh.'},
  {name: 'Minhas Rasheed', spec: 'Primary Care', description:'Ten years working experinence. Ex-Medical Officer Tehsil Headquarter Hospital, Sangarh.'},
  {name: 'Moeez Ali', spec: 'General Practitioner', description:'Five years working experinence. Ex-Medical Officer Tehsil Headquarter Hospital, Sangarh.'}
]

  constructor() { }

  ngOnInit(): void {
  }

}
