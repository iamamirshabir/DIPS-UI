export const endpoint = 'https://dips-rs.herokuapp.com/resource-server/api/';
export const appUrl = 'https://dips-p.web.app/';


export class Prescription {
  createdAt: string;
  updatedAt: string;
  prescription_id: number;
  prescription_notes: string;
  prescription_diagnosis: string;
  tests: string;
  symptoms: string;
  medicines: string;
  symptom: Symptom[];
  medicine: Medicine[];
  physician: Physician;
  user: User;
}

export class Disease {
  createdAt: string;
  updatedAt: string;
  disease_id: number;
  disease_name: string;
  disease_code: string;
  disease_details: string;
  diseasecategory: DiseaseCategory;
}

export class DiseaseCategory {
  createdAt: string;
  updatedAt: string;
  diseasecategory_id: number;
  diseasecategory_title: string;
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

export class Appointment {
  createdAt: string;
  updatedAt: string;
  appointment_id: number;
  appointment_on: string;
  prescription: Prescription;
  physician: Physician;
  user: User;
}

export class User {
  userac_id: number;
  userac_keycloak_id: string;
  userac_keycloak_username: string;
  userac_name: string;
  userac_dob: Date;
  userac_reg: boolean;
  userac_mobile: number;
  userac_email: string;
  createdAt: string;
  updatedAt: string;
}

export class Symptom {
  createdAt: string;
  updatedAt: string;
  symptom_id: number;
  symptom_text: string;
}

export class Physician {
  createdAt: string;
  updatedAt: string;
  physician_id: number;
  physician_name: string;
  physician_spec: string;
  physician_address: string;
  physician_visit_days: string;
  physician_max_daily: number;
  physician_reg_status: boolean;
  physician_reg_no: string;
  physician_availability: string;
  physician_time_start: number;
  physician_time_end: number;
  physician_keycloak_id: string;
  physician_keycloak_username: string;
  physician_email: any;
}

export class Diagnosis {
  id: number;
  patient: User;
  symptoms: Symptom[];
  diagnosis: string;
}
