import { Injectable } from '@angular/core';
import { Appointment, endpoint } from 'src/app/shared/classes';

import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  appointments: Appointment[];

  constructor(private http: HttpClient) {}

  getAppointmentOn(date: Date, pId: number): Observable<any> {
    return this.http
      .post(
        endpoint + 'appointments/physician/' + pId + '/getByDate/',
        new Date(date.toISOString().split('T')[0] + 'T00:00:00.000+00:00')
      )
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred', error.error.message);
    } else {
      console.error(
        'Backend returned code' + error.status + '  body was:' + error.message
      );
    }
    return throwError('Something bad happened; please try again later!');
  }
}
