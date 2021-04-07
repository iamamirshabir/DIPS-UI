import { Injectable } from '@angular/core';
import { Appointment, User ,Physician } from 'src/app/shared/classes';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  appointments: Appointment[];
  constructor() { 
    this.appointments;   }
}
