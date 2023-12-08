import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, catchError, tap, throwError } from 'rxjs';
import { AuthResponse } from './model/auth-resposne.model';
import {JwtHelperService} from "@auth0/angular-jwt";
import { environment } from 'src/env/env';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();


  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(auth:any): Observable<AuthResponse>{
    return this.http
    .post<AuthResponse>(environment.apiHost+'login',auth,{headers: this.headers})
   }

   logout(): Observable<string>{
    return this.http.get(environment.apiHost+'logOut',{responseType:'text'});
   }


  getRole(): any {
    if(this.isLoggedIn()){
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).role[0].authority;
    }
    return null;
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('user') != null;
  }

  setRole(): void{
    this.user$.next(this.getRole());
  }
}
