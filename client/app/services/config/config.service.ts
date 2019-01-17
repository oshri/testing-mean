import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { IServerUrl } from '../../models';

declare const window: any;

@Injectable()
export class Config implements IServerUrl {
	public baseUrl = (sessionStorage && sessionStorage.getItem('serverUrl')) ||
		environment.baseUrl ||
		`${window.location.protocol}//${window.location.host}`;

	public apiUrl = '/api';

	get restUrl() {
		return `${this.baseUrl}${this.apiUrl}`;
	}
}
