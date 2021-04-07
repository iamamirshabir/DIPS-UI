import { Injectable } from '@angular/core';
import { Physician } from 'src/app/shared/classes';

@Injectable({
  providedIn: 'root'
})
export class PhysiciansService {


  physicians: Physician[];
  
  constructor() {
  }
}