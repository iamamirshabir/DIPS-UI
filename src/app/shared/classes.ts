
export class Prescription{
    createdAt: string;
    updatedAt: string;
    prescription_id: number;
    prescription_notes: string;
    prescription_diagnosis: string;
    tests: string;
    symptom: Symptom[];
    medicine: Medicine[];
    physician: Physician;
    user: User;         
}


export class Medicine {
    createdAt: string;
    updatedAt: string;
    medicine_id: number;
    medicine_brand: string;
    medicine_composition: string;
    medicine_frequency: number;
    medicine_dosage: number; 
}
  
export class Appointment{
    createdAt: string;
    updatedAt: string;
    appointment_id: number;
    appointment_on: string;
    physician: Physician;
    user: User; 
  }
  

export class User{
    userac_id: number;
    userac_keycloak_id: string;
    userac_keycloak_username: string;
    userac_name:string;
    userac_dob: number;
    userac_reg: boolean;
    userac_mobile: number;  
    userac_email: string;
    createdAt: string;
    updatedAt: string;
}

export class Symptom{
    createdAt: string;
    updatedAt: string;
    symptom_id: number;
    symptom_text: string;
}
  
export class Physician
{
    createdAt: string;
    updatedAt: string;
    physician_id: number;
    physician_name: string;
    physician_spec: string;
    physician_address: string;
    physician_visit_days: string;
    physician_time_start: number;
    physician_time_end: number;
    physician_keycloak_id: string;
    physician_keycloak_username: string;    
}

export class Diagnosis{
id: number; 
patient: User;
symptoms: Symptom[];
diagnosis: string;    
}