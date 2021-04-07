import { Injectable } from '@angular/core';
import { Symptom } from './shared/classes';
import { catchError } from "rxjs/internal/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  
  endpoint = 'http://localhost:8081/resource-server/api/';

    private extractData(res: Response): any{
      const body = res;
      return body || {};
    }
  
    constructor(private http: HttpClient) {
    }
    
    
     getSymptoms(): Observable<any>{
      return this.http.get(this.endpoint + 'symptoms/').pipe
        (map(this.extractData),
        catchError(this.handleError)); 
    }

    private handleError(error : HttpErrorResponse): any {
      if(error.error instanceof ErrorEvent){
        console.error('An error occurred', error.error.message)
      }
      else{
        console.error(
          'Backend returned code ${error.status}, ' +
          'body was: ${error.error}'
        );
      }
      return throwError(
        ('Something bad happened; please try again later!')
      )
    }
    
   

}
