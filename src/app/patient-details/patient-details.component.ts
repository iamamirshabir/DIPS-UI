import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {MatChipInputEvent} from '@angular/material/chips';


export interface Symptom {
  name: string;
}


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  disableSelect = new FormControl(false);
  
  
  myControl = new FormControl();
  filteredOptions!: Observable<Symptom[]> ;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  symptoms: Symptom[] = [
    {name: 'Headache'},
    {name: 'Fever'},
    {name: 'Sneezing'},
    {name: 'Itching'},
    {name: 'Red Skin'},
    {name: 'Watery Eyes'},
    {name: 'Cough'},
    {name: 'Joint Pain'},
    {name: 'Muscular Pain'}
  ];
  selectedSymptoms: Symptom[]=[];

  constructor() { }

  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  onAddition(){
    let symptom: Symptom;
    let temp: string;
    let index: number; 
    temp = this.myControl.value;
    symptom = this.symptoms.filter(s => s.name == temp)[0];
    index = this.symptoms.findIndex(s => s.name == temp);
    if(index >= 0){
      symptom = this.symptoms[index];
      this.symptoms.splice(index,1);
      this.selectedSymptoms.push(symptom);
      this.myControl.reset();
      this.ngOnInit();
    }
    
//    let temp = this.myControl.value;
//    symptom.name = temp;   
//    if(this.symptoms.indexOf(symptom) < 0){
//      this.symptoms.push(symptom);
//    }
    //this.options.splice(this.options.indexOf(temp),1);
    }

  private _filter(value: string): Symptom[] {
    const filterValue = value.toLowerCase();
    return this.symptoms.filter(symptom=> symptom.name.toLowerCase().includes(filterValue));
  }

  remove(symptom: Symptom): void {
    const index = this.selectedSymptoms.indexOf(symptom);

    if (index >= 0) {
      this.symptoms.push(symptom);
      this.selectedSymptoms.splice(index, 1);
    }
  }
  
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our symptom
    if ((value || '').trim()) {
      this.symptoms.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  }
