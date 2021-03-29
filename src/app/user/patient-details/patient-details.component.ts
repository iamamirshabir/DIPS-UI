import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Observable} from 'rxjs';
import {findIndex, map, startWith} from 'rxjs/operators';
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

  primaryColor= "navy";
  accentColor= "#e83e8c";
  warnColor= "orange";
  infoColor="teal";
  successColor="green";
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  symptoms: Symptom[] = [
{name: 'abdominal cramp'},{name: 'abdominal distention'},{name: 'abnormal behavior'},{name: 'abnormal bleeding'},{name: 'abnormal sensation'},{name: 'abnormally frequent'},{name: 'abscess'},{name: 'aching'},{name: 'acne'},{name: 'acquiring drinking alcohol taking lot time'},{name: 'affected part turning white'},{name: 'anemia'},{name: 'anxiety'},{name: 'arm'},{name: 'attack pain'},{name: 'back'},{name: 'bacterial infection'},{name: 'bad breath'},{name: 'bad smelling thin vaginal discharge'},{name: 'bad smelling vaginal discharge'},{name: 'barky cough'},{name: 'belching'},{name: 'better sitting worse lying'},{name: 'birth baby younger week gestational age'},{name: 'bleeding gum'},{name: 'bleeding skin'},{name: 'blindness'},{name: 'blindness one eye'},{name: 'blister sunlight'},{name: 'bloating'},{name: 'blood stool'},{name: 'blood urine'},{name: 'bloody diarrhea'},{name: 'blue'},{name: 'bluish skin coloration'},{name: 'blurred vision'},{name: 'blurry vision'},{name: 'body tremor'},{name: 'bone pain'},{name: 'bowed leg'},{name: 'breakdown skeletal muscle'},{name: 'breathing problem'},{name: 'bruising'},{name: 'burning'},{name: 'burning redness eye'},{name: 'burning stabbing pain'},{name: 'burning urination'},{name: 'certain thought repeatedly'},{name: 'change bowel movement'},{name: 'change breast shape'},{name: 'change color'},{name: 'change hair'},{name: 'change reflex'},{name: 'change skin color red black'},{name: 'change sleeping eating pattern'},{name: 'change taste'},{name: 'change voice'},{name: 'characteristic facial feature'},{name: 'characteristic rash'},{name: 'chest discomfort'},{name: 'chest pain'},{name: 'chest tightness'},{name: 'chill'},{name: 'chronic cough'},{name: 'chronic pain bladder'},{name: 'clenched fist overlapping finger'},{name: 'close object appear blurry'},{name: 'clumsy'},{name: 'cm lump skin'},{name: 'cold sweat'},{name: 'coma'},{name: 'confused thinking'},{name: 'confusion'},{name: 'constipation'},{name: 'coolness'},{name: 'coordination'},{name: 'cough bloody mucus'},{name: 'cough sputum production'},{name: 'coughing'},{name: 'coughing blood'},{name: 'coughing including coughing blood'},{name: 'coughing mucus'},{name: 'crawl'},{name: 'cry episode'},{name: 'dark urine'},{name: 'darker'},{name: 'daytime sleepiness'},{name: 'death child le one year age'},{name: 'decreased ability feel pain'},{name: 'decreased ability see'},{name: 'decreased ability think'},{name: 'decreased ability think remember'},{name: 'decreased ability turn'},{name: 'decreased appetite'},{name: 'decreased motivation'},{name: 'decreased range motion'},{name: 'decreased taste'},{name: 'decreased vision'},{name: 'dehydration'},{name: 'delayed physical growth'},{name: 'delirium'},{name: 'delusion'},{name: 'dementia'},{name: 'depending subtype abdominal pain'},{name: 'depends organ involved'},{name: 'depressed mood'},{name: 'depression'},{name: 'dermatitis herpetiformis'},{name: 'developmental disability'},{name: 'diarrhea'},{name: 'diarrhea may bloody'},{name: 'diarrhea mixed blood'},{name: 'diarrhoea'},{name: 'difficulty breathing'},{name: 'difficulty cutting'},{name: 'difficulty eating'},{name: 'difficulty getting pregnant'},{name: 'difficulty remembering recent event'},{name: 'difficulty swallowing'},{name: 'difficulty walking'},{name: 'dimpling skin'},{name: 'discharge penis'},{name: 'disorientation'},{name: 'distant object appear blurry'},{name: 'distorted blurred vision distance'},{name: 'dizziness'},{name: 'double vision'},{name: 'drinking large amount alcohol long period'},{name: 'drooping eyelid'},{name: 'dry cough'},{name: 'dry damp skin'},{name: 'dry eye'},{name: 'dry mouth'},{name: 'ear pain'},{name: 'easy prolonged bleeding'},{name: 'emotional problem'},
{name: 'enlarged lymph node neck'},{name: 'enlarged spleen'},{name: 'enlarged thyroid'},{name: 'enlargement thyroid'},{name: 'enlargement tonsil'},{name: 'episode severe'},{name: 'erythema marginatum'},{name: 'excess hair'},{name: 'excessive amount uterine bleeding'},{name: 'excessive daytime sleepiness'},{name: 'excessive salivation'},{name: 'expanding area redness site tick bite'},{name: 'extreme sadness'},{name: 'extremity weakness'},{name: 'eye pain'},{name: 'eye strain'},{name: 'eyestrain'},{name: 'fast heart rate'},{name: 'fast heartbeat'},{name: 'fatigue'},{name: 'fear water'},{name: 'feel need check thing repeatedly'},{name: 'feeling cold'},{name: 'feeling faint upon standing'},{name: 'feeling generally unwell'},{name: 'feeling like passing'},{name: 'feeling need urinate right away'},{name: 'feeling tired'},{name: 'feeling tired time'},{name: 'fever'},{name: 'firm'},{name: 'flat discolored spot bump may blister'},{name: 'flu like illness'},{name: 'flu like symptom'},{name: 'fluid filled blister scab'},{name: 'fluid nipple'},{name: 'frequent infection'},{name: 'frequent urination'},{name: 'fullness'},{name: 'gas'},{name: 'gradual loss coordination'},{name: 'growth delay'},{name: 'gum disease'},{name: 'hair loss'},{name: 'half ring finger'},{name: 'hallucination'},{name: 'hallucination usually hearing voice'},{name: 'hard swelling skin'},{name: 'hard time reading small print'},{name: 'headache'},{name: 'hearing loss'},{name: 'hearing sound external sound present'},{name: 'heartburn'},{name: 'heat intolerance'},{name: 'heavy period'},{name: 'high blood pressure'},{name: 'high body temperature'},{name: 'hoarse voice'},{name: 'hold reading material farther away'},{name: 'impaired communication'},{name: 'inability child'},{name: 'inability move facial muscle one side'},{name: 'inability move feel one side body'},{name: 'increased breath rate'},{name: 'increased breathing rate'},{name: 'increased fat'},{name: 'increased heart rate'},{name: 'increased hunger'},{name: 'increased risk broken bone'},{name: 'increased risk infection'},{name: 'increased thirst'},{name: 'increasing weakening'},{name: 'index'},{name: 'infertility'},{name: 'inflamed eye'},{name: 'insomnia'},{name: 'intellectual disability'},{name: 'involuntary muscle movement'},{name: 'involuntary sleep episode'},{name: 'irregular edge'},{name: 'irregular menstrual period'},{name: 'irregular menstruation'},{name: 'irritability'},{name: 'irritation'},{name: 'itchiness'},{name: 'itching'},{name: 'itching genital area'},{name: 'itching result trouble sleeping'},{name: 'itchy'},{name: 'itchy blister'},{name: 'itchy bump'},{name: 'itchy ear'},{name: 'jaundice'},{name: 'jaw'},{name: 'jerky body movement'},{name: 'joint bone pain'},{name: 'joint swelling'},{name: 'large amount watery diarrhea'},{name: 'large forehead'},{name: 'large lymph node'},{name: 'large lymph node around neck'},{name: 'leg swelling'},{name: 'light sensitivity'},{name: 'little pain'},{name: 'localized breast pain redness'},{name: 'long term fatigue'},{name: 'loose frequent bowel movement'},{name: 'loose teeth'},{name: 'loss appetite'},{name: 'loss consciousness may sweating'},{name: 'loss hair part head body'},{name: 'loss lot blood childbirth'},{name: 'loss smell'},{name: 'loss vision one side'},{name: 'low blood pressure'},{name: 'low energy'},{name: 'low red blood cell'},{name: 'lower abdominal pain'},{name: 'lump breast'},{name: 'lump bump neck'},{name: 'maculopapular rash'},{name: 'malabsorption'},{name: 'may symptom'},{name: 'memory problem'},{name: 'mental ability'},{name: 'mental change'},{name: 'mid dilated pupil'},{name: 'middle finger'},{name: 'mild moderate intellectual disability'},{name: 'minimal'},{name: 'missed period'},{name: 'mole increasing size'},{name: 'mood change'},{name: 'mood swing'},{name: 'mouth sore'},{name: 'mouth ulcer'},{name: 'multiple painful joint'},{name: 'muscle ache difficulty breathing'},{name: 'muscle cramp'},{name: 'muscle joint pain'},{name: 'muscle spasm'},{name: 'muscle weakness'},{name: 'muscle weakness beginning foot hand'},{name: 'muscle weakness resulting inability move'},{name: 'muscular pain'},{name: 'myalgia'},{name: 'nausea'},{name: 'nausea vomiting'},{name: 'nausea vomiting weight loss dehydration occur'},{name: 'nearly undetectable spell'},{name: 'nearsightedness'},{name: 'neck'},{name: 'neck stiffness'},{name: 'needing urinate often'},{name: 'newly inverted nipple'},{name: 'non itchy skin ulcer'},{name: 'non painful cyst middle eyelid'},{name: 'nonaligned eye'},{name: 'none non specific'},{name: 'numbness'},{name: 'object different size eye'},{name: 'one eye myopia eye hyperopia'},{name: 'opening upper lip may extend nose palate'},{name: 'others'},{name: 'overlying redness'},{name: 'pain along inside edge shinbone'},{name: 'pain area'},{name: 'pain around ear'},{name: 'pain doesnt go shingle'},{name: 'pain going leg lower back'},{name: 'pain sex'},{name: 'pain specific bone'},{name: 'painful'},{name: 'painful blister lower leg'},{name: 'painful heavy period'},{name: 'painful joint base big toe'},{name: 'painful rash occurring stripe'},{name: 'painful skin'},{name: 'painful swelling parotid gland'},{name: 'painful swollen joint'},{name: 'painful tender outer part elbow'},{name: 'painless'},{name: 'painless lump'},{name: 'pale color'},{name: 'pale skin'},{name: 'pallor'},{name: 'paralysis'},{name: 'patch thick'},{name: 'patch white skin'},{name: 'perform certain routine repeatedly'},{name: 'period vigorous shaking'},{name: 'persistent rough white red patch mouth lasting longer week'},{name: 'photophobia'},{name: 'physical disability'},{name: 'pimple like rash'},{name: 'pinkish'},{name: 'playing video game extremely long period time'},{name: 'poor ability tolerate cold'},{name: 'poor appetite'},{name: 'poor coordination'},{name: 'poor tolerance heat'},{name: 'post nasal drip'},{name: 'problem language'},{name: 'problem mood'},{name: 'problem understanding speaking'},{name: 'problem vision'},{name: 'profuse sweating'},{name: 'progressive muscle weakness'},{name: 'prolonged'},{name: 'prolonged cough'},{name: 'prominent'},{name: 'protein urine'},{name: 'psychosis'},{name: 'pulsing pain'},{name: 'purple colored skin affected area'},{name: 'purple colored skin lesion'},{name: 'raised'},{name: 'raised red blue lesion'},{name: 'random outburst laughter'},{name: 'rapid breathing'},{name: 'recurring episode wheezing'},{name: 'red'},{name: 'red eye'},{name: 'red purple darker skin'},{name: 'red rash'},{name: 'red scaly patch skin breast'},{name: 'red skin'},{name: 'red spot white eye'},{name: 'red without blister'},{name: 'reddish eye'},{name: 'redness'},{name: 'redness eye'},{name: 'repetitive behavior'},{name: 'restricted interest'},{name: 'right lower abdominal pain'},{name: 'rigidity'},{name: 'ringing ear heartbeat'},{name: 'rough skin growth'},{name: 'runny nose'},{name: 'scaly patch skin'},{name: 'scratchiness'},{name: 'seizure'},{name: 'sensitivity smell'},{name: 'sensitivity sound'},{name: 'severe intellectual disability'},{name: 'severe pain'},{name: 'severe pain lower back abdomen'},{name: 'shakiness'},{name: 'shaking'},{name: 'sharp chest pain'},{name: 'shivering'},{name: 'shock like pain one side face last second minute'},{name: 'short height'},{name: 'short stature'},{name: 'shortness breath'},{name: 'sit'},{name: 'skin blister'},{name: 'skin breakdown'},{name: 'skin lesion generally pink color project outward'},{name: 'skin peeling'},{name: 'sleep problem'},{name: 'sleeping problem'},{name: 'slowness movement'},{name: 'small'},{name: 'small blister break open form painful ulcer'},{name: 'small blister surrounding swelling'},{name: 'small face'},{name: 'small head'},{name: 'small jaw'},{name: 'sneezing'},{name: 'social withdrawal'},{name: 'sometimes symptom'},{name: 'sore arm leg'},{name: 'sore throat'},{name: 'sore wrist'},{name: 'stiff muscle'},{name: 'stiff neck'},{name: 'stiffness'},{name: 'stomach pain'},{name: 'stroke'},{name: 'stuffy itchy nose'},{name: 'stunted growth'},{name: 'sudden'},{name: 'sudden loss muscle strength'},{name: 'sweat'},{name: 'swell pain near tumor'},{name: 'swelling'},{name: 'swelling abdomen'},{name: 'swelling around eye'},{name: 'swelling hand foot'},{name: 'swollen'},{name: 'swollen hand foot'},{name: 'swollen lymph node'},{name: 'taste acid'},{name: 'temporary fleeting vision one eye'},{name: 'tender breast'},{name: 'testicular pain'},{name: 'tingling'},{name: 'tingling hand foot'},{name: 'tingling thumb'},{name: 'tiredness'},{name: 'tooth loss'},{name: 'tremor'},{name: 'triangular tissue growth cornea'},{name: 'trouble breathing nose'},{name: 'trouble coordination'},{name: 'trouble opening mouth'},{name: 'trouble seeing'},{name: 'trouble sensation'},{name: 'trouble sleeping'},{name: 'trouble social interaction'},{name: 'trouble speaking'},{name: 'trouble swallowing'},{
  name: 'trouble talking'},{name: 'trouble walking'},{name: 'typically none'},{name: 'ulcer'},{name: 'ulcer around genitals'},{name: 'ulceration'},{name: 'unable move'},{name: 'unexplained weight loss'},{name: 'unintended weight loss'},{name: 'unpleasant smell present breath'},{name: 'upper abdominal pain'},{name: 'usage resulting problem'},{name: 'vaginal bleeding'},{name: 'vaginal bleeding without pain'},{name: 'vaginal discharge'},{name: 'variable'},{name: 'vary depending part brain involved'},{name: 'varying degree muscle weakness'},
{name: 'velvety skin'},{name: 'vision loss'},{name: 'vomiting'},{name: 'warm'},{name: 'wart'},{name: 'watery eye'},{name: 'weak grip'},{name: 'weak muscle'},{name: 'weakness limb'},{name: 'weakness numbness affected leg'},{name: 'webbed neck'},{name: 'weight gain'},{name: 'wet'},{name: 'wheezing'},{name: 'white patch vaginal discharge'},{name: 'widespread pain'},{name: 'withdrawal occurring stopping'},{name: 'worrying'},{name: 'yellow skin'},{name: 'yellowish coloration skin white eye'},{name: 'yellowish skin'},{name: 'yellowish skin crust'}
  ];
  selectedSymptoms: Symptom[]=[];
  isLinear = false;
  tokens: number[];
  tokenString: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  
  constructor(private _formBuilder: FormBuilder) { 
    this.tokens = new Array(this.symptoms.length);
    this.tokens.fill(0,0,this.symptoms.length);
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

   
   generateToken(){
     this.tokenString = this.tokens.toString();

/*     if(this.selectedSymptoms.includes(this.symptoms[0])){
      this.tokenString ="1";
    }else this.tokenString ="0";

   for(let i=1;i<this.symptoms.length;i++){
      if(this.selectedSymptoms.includes(this.symptoms[i])){
        this.tokenString= (this.tokenString+",1");
      }else     this.tokenString= (this.tokenString+",0");
         }     */
   
  //this.symptoms.forEach(obj =>{if(this.selectedSymptoms.includes(obj)){
   // this.symptoms[this.symptoms.indexOf(obj)] = 1;
   // }})
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
      this.tokens[index]=1;
      this.myControl.setValue("");
      //this.ngOnInit();
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
      this.tokens[index]=0;
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
