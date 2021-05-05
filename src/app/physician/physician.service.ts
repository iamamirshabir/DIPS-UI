import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from '../shared/classes';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {

  private  appointmentObject = new BehaviorSubject<Appointment>(new Appointment());
   
  selectedAppointment = this.appointmentObject.asObservable();

  constructor() { }

  changeAppointment(appointment: Appointment) {
    this.appointmentObject.next(appointment);
  }

}
