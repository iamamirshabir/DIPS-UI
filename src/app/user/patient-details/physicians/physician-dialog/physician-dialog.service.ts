import { Injectable } from '@angular/core';
import { catchError } from "rxjs/internal/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Appointment, endpoint } from 'src/app/shared/classes';

@Injectable({
  providedIn: 'root'
})
export class PhysicianDialogService {

  private extractData(res: Response): any{
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  //User Id is temporary
  setAppointment(a: Appointment, uId:number, pId: number): Observable<any>{
    return this.http.post(endpoint + 'appointments/user/'+ uId +'/physician/'+pId,a).pipe
      (map(this.extractData),
      catchError(this.handleError)); 
  }
  
  private handleError(error : HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      alert('An error occurred' + error.error.message)
    }
    else{
      alert(
        'Backend returned code '+error.status +
        'body was: '+error.error
      );
    }
    return throwError(
      ('Something bad happened; please try again later!')
    )
  }
}
