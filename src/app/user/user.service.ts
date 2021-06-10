import { Injectable } from '@angular/core';

import { KeycloakService } from 'keycloak-angular';

import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Symptom, User, endpoint, appUrl } from '../shared/classes';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user;
  userAc: User;
  userReg= false;

  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  constructor(
    private http: HttpClient,
    protected keycloak: KeycloakService,
    private router: Router
  ) {}

  

  getProfile() {
    try {
      let userDetails = this.keycloak.getKeycloakInstance().idTokenParsed;
      return userDetails;
    } catch (e) {
      console.log('Could not get:', e);
      return undefined;
    }
  }

  setUserProfile(u: User) {
    this.AddUser(u).subscribe((resp: any) => {
      this.userAc = resp;
      console.log(this.userAc);
    });
  }

  ngOnInit(): void {}

  registerUser(u: User): Observable<any> {
    return this.http
      .put(endpoint + 'users/', u)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getUserByKeycloak(id: string): Observable<any> {
    return this.http
      .get(endpoint + 'users/keycloak/?keycloak=' + id)
      .pipe(map(this.extractData), catchError(this.handleProfileError));
  }

  AddUser(u: User): Observable<any> {
    return this.http
      .post(endpoint + 'users/', u)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  public handleProfileError(error: HttpErrorResponse) {
    
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      this.userReg = false;
    }
    
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred', error.error.message);
    } else {
      console.error(
        'Backend returned code :' + error.status + 'body was: ' + error.error
      );
    }
    return throwError('Something bad happened; please try again later!');
  }
  logout() {
    this.keycloak.logout(appUrl);
  }
}
