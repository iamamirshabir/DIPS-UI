import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Appointment, endpoint, Physician, User } from '../shared/classes';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {

  physician;
  physicianAc: Physician;

  private extractData(res: Response): any{
    const body = res;
    return body || {};
  }

  private  appointmentObject = new BehaviorSubject<Appointment>(new Appointment());
   
  selectedAppointment = this.appointmentObject.asObservable();

  private  userObject = new BehaviorSubject<User>(new User());
   
  selectedUser = this.userObject.asObservable();

  constructor(private http: HttpClient,
    protected keycloak: KeycloakService, private router: Router) { }

  changeAppointment(appointment: Appointment) {
    this.appointmentObject.next(appointment);
  }

  changeUser(user: User) {
    this.userObject.next(user);
  }
 
  getPhysicianAccount(id: string):void{
    this.getPhysicianByKeycloak(id).subscribe((resp: any) =>{
      this.physicianAc = resp;
      this.router.navigate(['physician/dashboard']);
      console.log(this.physicianAc);
    });
  }

  getProfile(){
    try{
      let userDetails = this.keycloak.getKeycloakInstance().idTokenParsed;
      return userDetails;
  } catch(e) {
    console.log("Could not get:", e)
    return undefined;
  }
}

  getPhysicianByKeycloak(id: string): Observable<any>{
    return this.http.get(endpoint + 'physicians/keycloak/?keycloak='+id).pipe
      (map(this.extractData),
      catchError(this.handleProfileError)); 
  }

  private handleProfileError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    alert("Something went wrong");
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


  private handleError(error : HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred', error.error.message)
    }
    else{
      console.error(
        'Backend returned code :' +error.status+
        'body was: '+error.error
      );
    }
    return throwError(
      ('Something bad happened; please try again later!')
    )
  }

  logout(){
    this.keycloak.logout("http://localhost:8089/");
  }

}
