import { Component, OnInit } from '@angular/core';

export class User{
  name:string;
  type: string;
  age: number;
  mobile: number;

}
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
  user ={name:'Moeez Faheem',type:'User', age: 35, mobile: 923127856786};
  constructor() { }

  ngOnInit(): void {
  }

}
