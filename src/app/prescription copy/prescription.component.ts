import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export interface Patient{
  name: string;
  age: number;
  mobile: number;
}

export interface Symptom {
  name: string;
}



@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})

export class PrescriptionComponent implements OnInit {


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  patient: Patient = {name: 'Faisal Saleh', age: 45, mobile : 923032424141} 

  frequencies: string[]=['6','12','24']


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

}
