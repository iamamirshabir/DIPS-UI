import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Observable} from 'rxjs';
import {findIndex, map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import { Diagnosis, Disease, Symptom, User } from 'src/app/shared/classes';
import { SymptomsService } from 'src/app/symptoms.service';
import { PatientdetailsService } from './patientdetails.service';



@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  
  myControl = new FormControl();
  filteredOptions!: Observable<Symptom[]> ;

  //mat-style properties 
  primaryColor= "navy";
  accentColor= "#e83e8c";
  warnColor= "orange";
  infoColor="teal";
  successColor="green";

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  //declarations
  symptoms: Symptom[]; 
  selectedSymptoms: Symptom[]=[];
  diagnosis: Diagnosis;
  diagnosisResult;

  resultLoaded: Promise<boolean>;
  diseaseLoaded: Promise<boolean>;
  disease : Disease;

  isLinear = true;
  //token String declarations
  tokens: number[];
  tokenString: string;
  tokenEnabled= false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  
  s1Checked: false;
  s2Checked: false;
  s3Checked: false;
  s4Checked: false;
  s5Checked: false;

  constructor(private _formBuilder: FormBuilder, private symptomService: SymptomsService,
    private patientdetailService: PatientdetailsService) 
  {
    this.symptoms = symptomService.addedSymptoms;
    this.tokens = new Array(this.symptoms.length);
    this.tokens.fill(0,0,this.symptoms.length);
    this.disease = new Disease();
  }

  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
      

    }

  getDiagnosisResult(token: string):void{
    this.patientdetailService.getDiagnosisResult(token).subscribe((resp: any) =>{
      this.diagnosisResult = resp;
      this.resultLoaded = Promise.resolve(true);
      this.patientdetailService.getDiseaseDetails(resp.potentialDiseases[0]).subscribe(
        (res: any)=>{
          this.disease = res;
          console.log(this.disease);
          this.diseaseLoaded = Promise.resolve(true);
        });
      console.log(this.diagnosisResult);
    });
  }

  onFormSubmit() {
    if(this.s1Checked){
      this.myControl.setValue('high blood pressure');
      this.onAddition();
    }
    if(this.s2Checked){
      this.myControl.setValue('fever');
      this.onAddition();
    }
    if(this.s3Checked){
      this.myControl.setValue('coughing');
      this.onAddition();
    }
    if(this.s4Checked){
      this.myControl.setValue('depression');
      this.onAddition();
    }
    if(this.s5Checked){
      this.myControl.setValue('fatigue');
      this.onAddition();
    }
    this.myControl.setValue('');
  }

  //Binary Array of selected symptoms
   generateToken(){
     this.tokenString = this.tokens.toString();
     this.getDiagnosisResult(this.tokenString);
     this.diagnosis = new Diagnosis();
     this.diagnosis.id = 101;
     this.diagnosis.symptoms = this.selectedSymptoms;
     this.diagnosis.patient = new User();
     
  }

  //Mat-autocomplete addition function
  onAddition(){
    let symptom: Symptom;
    let temp: string;
    let index: number; 
    temp = this.myControl.value;
    //symptom = this.symptoms.filter(s => s.symptom_text == temp)[0];
    index = this.symptoms.findIndex(s => s.symptom_text == temp);
    if(index >= 0){
      symptom = this.symptoms[index];
      this.symptoms.splice(index,1);
      this.selectedSymptoms.push(symptom);
      document.getElementById('symptomSelector')?.focus();
      this.tokens[symptom.symptom_id]=1;
      this.myControl.setValue('');
      if(this.selectedSymptoms.length>2){
        this.tokenEnabled = true;
      }
      //this.ngOnInit();
    }
   
}



  private _filter(value: string): Symptom[] {
    const filterValue = value.toLowerCase();
    return this.symptoms.filter(symptom=> symptom.symptom_text.toLowerCase().includes(filterValue));
  }

  remove(symptom: Symptom): void {
    const index = this.selectedSymptoms.indexOf(symptom);

    if (index >= 0) {
      this.symptoms.push(symptom);
      this.selectedSymptoms.splice(index, 1);
      this.tokens[symptom.symptom_id]=0;
    }
  }
  
  /* add(event: MatChipInputEvent): void {
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
 */
  }
