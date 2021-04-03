import { Injectable } from '@angular/core';
import { Physician } from 'src/app/shared/classes';

@Injectable({
  providedIn: 'root'
})
export class PhysiciansService {


  physicians: Physician[];
  constructor() {
    this.physicians = [
      {    name: "Aftab Ahmed",
        spec: "Cardiologist",
        address: "IMH hospital, Mandeer",
        visit_days: ['Mon','Tue','Fri'],
        start_time: 10,
        end_time: 15,
        description: "A lot of practical experience",
        keycloak_id: "Fadsadsf",
        keycloak_username: "ausername"
      },
      {    name: "Mamoon Banras",
        spec: "Padiatric",
        address: "IMH hospital, Mandeer",
        visit_days: ['Mon','Tue','Fri'],
        start_time: 10,
        end_time: 15,
        description: "A lot of practical experience",
        keycloak_id: "Fadsadsf",
        keycloak_username: "ausername"
      },
      {    name: "Mobeen Ahmed",
        spec: "Cardiologist",
        address: "IMH hospital, Mandeer",
        visit_days: ['Mon','Tue','Fri'],
        start_time: 10,
        end_time: 15,
        description: "A lot of practical experience",
        keycloak_id: "Fadsadsf",
        keycloak_username: "ausername"
      },
      {    name: "Mateen Faisal",
        spec: "Primary Care",
        address: "IMH hospital, Mandeer",
        visit_days: ['Mon','Tue','Fri'],
        start_time: 10,
        end_time: 15,
        description: "A lot of practical experience",
        keycloak_id: "Fadsadsf",
        keycloak_username: "ausername"
      }
    ]
   }
}
