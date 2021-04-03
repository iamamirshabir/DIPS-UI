
export class Prescription{
    id: number;
    appointment_no: number;
    user: User;
    physician: Physician;
    symptoms: Symptom[];
    notes: string;
    diagnosis: string;
    test: Test[];
    medicines : Medicine[];
    date: Date;
}

export class Test {
    id: number;
    title: string;
}

export class Medicine {
    title: string;
    brand: string;
    weight: number;
    frequency: number;
}
  
export interface Appointment{
    id: number;
    added_on: Date;
    user: User;
    physician: Physician;
  }
  

export class User{
    id: number;
    keycloak_id: string;
    keycloak_user: string;
    name:string;
    type: string;
    age: number;
    mobile: number;  
}

export class Symptom{
    id: number;
    text: string;
    code: string;    
}
  
export class Physician
{
    name: string;
    spec: string;
    address: string;
    visit_days: string[];
    start_time: number;
    end_time: number;
    description: string;
    keycloak_id: string;
    keycloak_username: string;
}

export class Diagnosis{
id: number; 
patient: User;
symptoms: Symptom[];
diagnosis: string;    
}