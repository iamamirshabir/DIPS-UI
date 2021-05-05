import { Injectable } from '@angular/core';

import { KeycloakService } from 'keycloak-angular';

import { catchError } from "rxjs/internal/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Symptom, User, endpoint } from '../shared/classes';


@Injectable({
  providedIn: 'root'
})
export class UserService {
   
  user;
  userAc: User;

    private extractData(res: Response): any{
      const body = res;
      return body || {};
    }
  

  constructor(
    private http: HttpClient,
    protected keycloak: KeycloakService
  ){
  }

  getUserAccount(email: string):void{
    this.getUserByEmail(email).subscribe((resp: any) =>{
      this.userAc = resp;
      console.log(this.userAc);
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

setUserProfile(u: User){
  this.AddUser(u).subscribe((resp: any) =>{
  this.userAc = resp;
  console.log(this.userAc);
});
}

  ngOnInit(): void {
    
  }

  getUserByEmail(email: string): Observable<any>{
    return this.http.get(endpoint + 'users/filterByEmail/?email='+email).pipe
      (map(this.extractData),
      catchError(this.handleError)); 
  }

  AddUser(u: User): Observable<any>{
    return this.http.post(endpoint + 'users/', u).pipe
    (map(this.extractData),
    catchError(this.handleError)); 
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
    this.keycloak.logout(); 
   }

  

}
