import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
	Observable,
	catchError,
	map,
	tap,
	throwError,
} from 'rxjs';
import { AuthResponse } from './model/auth-resposne.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/env/env';

@Injectable({
	providedIn: 'root',
})
export class AuthorizationService {
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		skip: 'true',
	});

	user$ = new BehaviorSubject('');
	userState = this.user$.asObservable();

	constructor(private http: HttpClient) {
		this.user$.next(this.getRole());
	}

	login(auth: any): Observable<AuthResponse> {
		return this.http
			.post<AuthResponse>(environment.apiHost + 'login', auth, {
				headers: this.headers,
			})
			.pipe(catchError(this.handleError));
	}

	logout(): Observable<string> {
		return this.http.get(environment.apiHost + 'logOut', {
			responseType: 'text',
		});
	}

	getRole(): any {
		if (this.isLoggedIn()) {
			const accessToken: any = localStorage.getItem('user');
			const helper = new JwtHelperService();
			return helper.decodeToken(accessToken).role[0].authority;
		}
		return null;
	}

	getPersonId(): string {
		return localStorage.getItem('personID') || '';
	}
	getUserId(): string {
		return localStorage.getItem('userID') || '';
	}
	isLoggedIn(): boolean {
		return localStorage.getItem('user') != null;
	}

	setRole(): void {
		this.user$.next(this.getRole());
	}

	private handleError(error: HttpErrorResponse) {
		let errorMessage = '';
		switch (error.status) {
			case 404:
				errorMessage = "User doesn't exist.";
				break;
			case 403:
				errorMessage = "Email isn't validated.";
				break;
			case 401:
				errorMessage = 'User is suspended.';
				break;
			default:
				break;
		}
		return throwError(() => new Error(errorMessage));
	}
}
