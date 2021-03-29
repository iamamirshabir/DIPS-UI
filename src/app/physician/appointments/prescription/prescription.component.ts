import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatTable } from "@angular/material/table";

export interface Medicine {
  title: string;
  brand: string;
  weight: number;
  frequency: number;
}

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

  @ViewChild(MatTable) table!: MatTable<any>;
  ELEMENT_DATA: Medicine[] = [];

  displayedColumns: string[] = ['title', 'brand', 'weight', 'frequency'];
  dataSource = this.ELEMENT_DATA;

  patient: Patient = {name: 'Faisal Saleh', age: 45, mobile : 923032424141} 

  frequencies: number[]=[6,12,24]
  medNameControl = new FormControl();
  medWeightControl = new FormControl();
  medFrequencyControl = new FormControl();
  myControl = new FormControl();
  filteredOptions!: Observable<Symptom[]> ;
  frequency!: number ;

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

  addMedicine(){
    let medicine: Medicine = {title: '',brand:'',weight:0,frequency:0};
    let name,formula,frequency: string;
    let weight: number;
    name = this.medNameControl.value;
    formula = 'N/A';
    weight = this.medWeightControl.value;
    frequency = document.getElementById('fr')?.innerText.trim()!;
        if(name!= null && weight != null && frequency != null ){
      medicine.brand = formula;
      medicine.title = name;
      medicine.frequency = +frequency;
      medicine.weight = weight;
      this.ELEMENT_DATA.push(medicine);
      this.medNameControl.reset();
      this.medWeightControl.reset();
      document.getElementById('medName')?.focus();
    }
    this.table.renderRows();
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
