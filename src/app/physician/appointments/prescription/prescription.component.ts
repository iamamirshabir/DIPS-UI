import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatTable } from "@angular/material/table";

import { Medicine, Physician, Prescription, Symptom } from 'src/app/shared/classes';

import { SymptomsService } from 'src/app/symptoms.service';
import { PrescriptionService } from './prescription.service';


@Component({
  selector: 'app-prescription',
  providers: [PrescriptionService, SymptomsService],
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})

export class PrescriptionComponent implements OnInit {

  //Table for Medicine Display writing prescription
  @ViewChild(MatTable) table!: MatTable<any>;
  ELEMENT_DATA: Medicine[] = [];

  //Object of prescription for saving data
  prescription: Prescription;
  symptoms: Symptom[];

  //Table descripiton of Medicine Data display
  displayedColumns: string[] = ['title', 'brand', 'weight', 'frequency'];
  dataSource = this.ELEMENT_DATA;  
  frequencies: number[]=[6,12,24]


    //Markup controls
  medNameControl = new FormControl();
  medWeightControl = new FormControl();
  medFrequencyControl = new FormControl();
  myControl = new FormControl();

  //Auto-complete of symptom search
  filteredOptions!: Observable<Symptom[]> ;
  frequency!: number ;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  
  constructor(private prescriptionService: PrescriptionService,
    private symptomService: SymptomsService) {
    
    //Initializations
    this.prescription = prescriptionService.prescriptions[0];
    this.prescription.symptoms = [];
    this.prescription.medicines = [];

    //Symptoms fetched using service
    this.symptoms = symptomService.symptoms;
  }
  
  //Makes call to PDF service
  generatePdf(){
    this.prescriptionService.generatePdf(this.prescription);  
  }

  ngOnInit(){
    //For value change in auto-complete
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  //Medicine Added to Page and Prescription Object
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
      this.prescription.medicines.push(medicine);
      this.medNameControl.reset();
      this.medWeightControl.reset();
      document.getElementById('medName')?.focus();
    }
    this.table.renderRows();
  }

  //Any Symptom is added
  onAddition(){
    let symptom: Symptom;
    let temp: string;
    let index: number; 
    temp = this.myControl.value;
    symptom = this.symptoms.filter(s => s.text == temp)[0];
    index = this.symptoms.findIndex(s => s.text == temp);
    if(index >= 0){
      symptom = this.symptoms[index];
      this.symptoms.splice(index,1);
      this.prescription.symptoms.push(symptom);
      this.myControl.reset();
      this.ngOnInit();
    }
    }

  //Function used by AutoComplete  
  private _filter(value: string): Symptom[] {
    const filterValue = value.toLowerCase();
    return this.symptoms.filter(symptom=> symptom.text.toLowerCase().includes(filterValue));
  }

  //If removed from chips
  remove(symptom: Symptom): void {
    const index = this.prescription.symptoms.indexOf(symptom);

    if (index >= 0) {
      this.symptoms.push(symptom);
      this.prescription.symptoms.splice(index, 1);
    }
  }

}
