import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatTable } from "@angular/material/table";
import { Appointment, Medicine, Prescription, Symptom } from 'src/app/shared/classes';

import { PrescriptionService } from './prescription.service';
import { SymptomsService } from 'src/app/symptoms.service';
import { PhysicianService } from '../../physician.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-prescription',
  providers: [ PrescriptionService, SymptomsService],
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})

export class PrescriptionComponent implements OnInit {

  //Table for Medicine Display writing prescription
  @ViewChild(MatTable) table!: MatTable<any>;
  ELEMENT_DATA: Medicine[] = [];

  //Object of prescription for saving data
  prescription: Prescription;
  appointment: Appointment;
  a: number;
  symptoms: Symptom[];

  //Table descripiton of Medicine Data display
  displayedColumns: string[] = ['medicine_brand', 'medicine_composition', 'medicine_dosage', 'medicine_frequency'];
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

  //temp
  i: number[];
  
  constructor(private prescriptionService: PrescriptionService,
    private symptomService: SymptomsService,
    private readonly physicianService: PhysicianService,
    private _snackBar: MatSnackBar) {
    this.physicianService.selectedAppointment.subscribe(appointment =>(this.appointment = appointment)); 
    this.prescription = new Prescription();
    this.prescription.symptom = new Array();
    this.prescription.medicine = new Array();
    this.prescription.physician = this.appointment.physician;
    this.prescription.user = this.appointment.user;
    //this.getPrescription('4');
    //Symptoms fetched using service
    this.symptoms = this.symptomService.addedSymptoms;
     //this.getAllSymptoms();
       
  }

  ngOnInit(){
     
     //For value change in auto-complete
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      //this.addPrescription(this.prescription, '4');
      //this.AddPrescription(this.prescription,'1','2','3');
      //this.AddSymptomToPrescription('10');
  }

  addPrescription(): void {
    this.prescriptionService.AddPrescription(this.prescription, this.appointment.appointment_id).subscribe((resp: any) =>{
      this.prescription = resp;
      this._snackBar.open("This Prescription is Succesfully Saved", "Okay")
      console.log(this.prescription);
    })
  }

  getAllSymptoms(): Symptom[]{
    this.symptomService.getSymptoms().subscribe((resp: any) =>{
      this.symptoms = resp._embedded.symptomList;
      console.log(this.symptoms);
    })  
    return this.symptoms;  
  }

  //Makes call to PDF service
  generatePdf(){
    this.prescriptionService.generatePdf(this.prescription);  
  }


  AddSymptomToPrescription(pId : string):void{
    this.prescriptionService.AddSymptomToPrescription(pId, this.generateIndexes(this.prescription.symptom))
    .subscribe((resp: any )=> {
      console.log(resp);
    });
  }

  getPrescription(pId: string):void{
    this.prescriptionService.getPrescription(pId).subscribe((resp: any) =>{
      this.prescription = resp;
      console.log(this.prescription);
    }

    )
  }
  uploadSymptoms( ){
    this.AddSymptomToPrescription('4');
  }

  generateIndexes(s: Symptom[]) : number[] {
    var indexes = new Array();
    s.forEach(s => indexes.push(s.symptom_id));
    return  indexes;
  }

  //Medicine Added to Page and Prescription Object
  addMedicine(){
    let medicine: Medicine = {medicine_id:0,medicine_brand: '',medicine_composition:'',medicine_dosage:0,medicine_frequency:0,createdAt: '', updatedAt:''};
    let name,formula,frequency: string;
    let weight: number;
    name = this.medNameControl.value;
    formula = 'N/A';
    weight = this.medWeightControl.value;
    frequency = document.getElementById('fr')?.innerText.trim()!;
        if(name!= null && weight != null && frequency != null ){
      medicine.medicine_brand = name;
      medicine.medicine_composition = formula;
      medicine.medicine_frequency = +frequency;
      medicine.medicine_dosage = weight;
      this.ELEMENT_DATA.push(medicine);
      this.prescription.medicine.push(medicine);
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
    symptom = this.symptoms.filter(s => s.symptom_text == temp)[0];
    index = this.symptoms.findIndex(s => s.symptom_text == temp);
    if(index >= 0){
      symptom = this.symptoms[index];
      this.symptoms.splice(index,1);
      this.prescription.symptom.push(symptom);
      document.getElementById('symptomSelector')?.focus();
      this.myControl.setValue('');
      //this.ngOnInit();
    }
    }

  //Function used by AutoComplete  
  private _filter(value: string): Symptom[] {
    const filterValue = value.toLowerCase();
    return this.symptoms.filter(symptom=> symptom.symptom_text.toLowerCase().includes(filterValue));
  }

  //If removed from chips
  remove(symptom: Symptom): void {
    const index = this.prescription.symptom.indexOf(symptom);

    if (index >= 0) {
      this.symptoms.push(symptom);
      this.prescription.symptom.splice(index, 1);
    }
  }

}
