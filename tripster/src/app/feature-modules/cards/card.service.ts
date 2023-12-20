import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from './accommodation-request-card/model/status.model';
import { environment } from 'src/env/env';

@Injectable({
	providedIn: 'root',
})
export class CardService {
	constructor(private http: HttpClient) {}

	accepted(id: number) {
		const status: Status = {
			id: id,
			status: 'ACTIVE',
		};
		return this.http.patch<Status>(
			environment.apiHost + 'accommodations',
			status
		);
	}

	suspended(id: number) {
		const status: Status = {
			id: id,
			status: 'SUSPENDED',
		};
		return this.http.patch<Status>(
			environment.apiHost + 'accommodations',
			status
		);
	}
}
