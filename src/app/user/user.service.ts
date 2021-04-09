import { Injectable } from '@angular/core';

import { catchError } from "rxjs/internal/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Symptom, User } from '../shared/classes';


@Injectable({
  providedIn: 'root'
})
export class UserService {
   

  endpoint = 'http://localhost:8081/resource-server/api/';

    private extractData(res: Response): any{
      const body = res;
      return body || {};
    }
  

  constructor(
     private http: HttpClient
  ){
    
  }

  ngOnInit(): void {
    
  }

  getUserByEmail(email: string): Observable<any>{
    return this.http.get(this.endpoint + 'users/filterByEmail/?email='+email).pipe
      (map(this.extractData),
      catchError(this.handleError)); 
  }

  AddUser(u: User): Observable<any>{
    return this.http.post(this.endpoint + 'users/', u).pipe
    (catchError(this.handleError)); 
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
