import { Component, OnInit } from '@angular/core';

export interface Appointment{
  id: number;
  by: string;
  age: number;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})

export class AppointmentsComponent implements OnInit {

  appointments: Appointment[]=[{
    id: 101,by: 'Faisal Saleh', age: 45  },
  {id: 102, by: 'Ceilla Yurid',age: 55 },
  {id: 103, by: 'Murad Saeed', age:38 },{
    id: 101,by: 'Faisal Saleh', age: 45  },
  {id: 102, by: 'Ceilla Yurid',age: 55 },
  {id: 103, by: 'Murad Saeed', age:38 },{
    id: 101,by: 'Faisal Saleh', age: 45  },
  {id: 102, by: 'Ceilla Yurid',age: 55 },
  {id: 103, by: 'Murad Saeed', age:38 },{
    id: 101,by: 'Faisal Saleh', age: 45  },
  {id: 102, by: 'Ceilla Yurid',age: 55 },
  {id: 103, by: 'Murad Saeed', age:38 },
  
] 

  constructor() { }

  ngOnInit(): void {
  }

}
