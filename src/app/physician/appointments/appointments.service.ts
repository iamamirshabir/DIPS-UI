import { Injectable } from '@angular/core';
import { Appointment, User ,Physician } from 'src/app/shared/classes';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  appointments: Appointment[];
  constructor() { 
    this.appointments = [{
      id: 101,added_on: new Date(), user: new User() ,physician: new Physician() },
    {id: 102, added_on: new Date(),user: new User()  ,physician: new Physician()},
    {id: 103, added_on: new Date(), user: new User() ,physician: new Physician()},{
      id: 101,added_on: new Date(), user: new User()  ,physician: new Physician() },
    {id: 102, added_on: new Date(),user: new User() ,physician: new Physician() },
    {id: 103, added_on: new Date(), user: new User(),physician: new Physician() },{
      id: 101,added_on: new Date(), user: new User()  ,physician: new Physician() },
    {id: 102, added_on: new Date(),user: new User() ,physician: new Physician() },
    {id: 103, added_on: new Date(), user: new User(),physician: new Physician() },{
      id: 101,added_on: new Date(), user: new User() ,physician: new Physician()  },
    {id: 102, added_on: new Date(),user: new User()  ,physician: new Physician()},
    {id: 103, added_on: new Date(), user: new User() ,physician: new Physician()},
    
  ] 
  }
}
