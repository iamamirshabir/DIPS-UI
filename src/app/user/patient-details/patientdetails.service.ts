import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { endpoint } from 'src/app/shared/classes';

@Injectable({
  providedIn: 'root',
})
export class PatientdetailsService {
  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) {}

  getDiagnosisResult(token: string): Observable<any> {
    return this.http
      .post(endpoint + 'diagnosis/', token)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getDiseaseDetails(name: string): Observable<any> {
    return this.http
      .post(endpoint + 'diseases/staticByName/', name)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred', error.error.message);
    } else {
      console.error(
        'Backend returned code ${error.status}, ' + 'body was: ${error.error}'
      );
    }
    return throwError('Something bad happened; please try again later!');
  }
}
