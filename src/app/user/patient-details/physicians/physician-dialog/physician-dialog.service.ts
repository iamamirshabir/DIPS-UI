import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Appointment, endpoint } from 'src/app/shared/classes';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment, PageOrientation, PageSize } from 'pdfmake/interfaces';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PhysicianDialogService {
  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  //PDFMake properties that require typecast from javascript
  pageMargins: [number, number, number, number] = [50, 50, 50, 50];
  right: Alignment = 'right';
  orient: PageOrientation = 'landscape';

  constructor(private http: HttpClient) {}

  //User Id is temporary
  setAppointment(a: Appointment, uId: number, pId: number): Observable<any> {
    return this.http
      .post(endpoint + 'appointments/user/' + uId + '/physician/' + pId, a)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      alert('An error occurred' + error.error.message);
    } else {
      alert(
        'Backend returned code ' + error.status + 'body was: ' + error.error
      );
    }
    return throwError('Something bad happened; please try again later!');
  }
  generatePdf(appointment: Appointment) {
    var documentDefinition = this.getDocDefinition(appointment);
    pdfMake.createPdf(documentDefinition).open();
  }

  getDocDefinition(appointment: Appointment) {
    sessionStorage.setItem('appointment', JSON.stringify(appointment));
    return {
      pageOrientation: this.orient,
      pageMargins: this.pageMargins,
      content: [
        {
          text: 'Diagnosis Intuition And Prescription System',
          style: 'title',
        },
        {
          text: '__________________________________________________________',
          color: 'green',
        },
        {
          text: 'APPOINTMENT RECEIPT',
          style: 'header',
        },
        {
          text: '__________________________________________________________',
          color: 'green',
        },
        {
          text: 'Appointment On: ' + appointment.appointment_on,
          color: 'green',
        },
        {
          text: 'ID:  ' + appointment.appointment_id,
          style: 'name',
        },
        {
          text: 'Appointment With:  ' + appointment.physician.physician_name,
          color: 'blue',
        },
        {
          text: appointment.physician.physician_spec,
        },
        {
          text: 'Patient:  ' + appointment.user.userac_name,
          color: 'green',
        },
        {
          text: 'Date of Birth:  ' + appointment.user.userac_dob,
        },
        {
          text: 'Mobile:  ' + appointment.user.userac_mobile,
        },
      ],

      styles: {
        title: {
          fontSize: 28,
          bold: true,
          color: '#898989',
        },
        header: {
          fontSize: 14,
          color: '#e8b200',
          bold: true,
        },
      },
    };
  }
}
