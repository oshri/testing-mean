import { Config } from './config.service';
import { TestBed, inject, async } from '@angular/core/testing';

describe('Config: service', () => {
	let service: Config;
	const serverUrl = JSON.stringify({
		serverUrl: 'http://www.citiblockchain.com'
	});

	beforeEach(() => {
		service = new Config();
	});

	it('should inject baseUrl into sessionStorage', () => {
		window.sessionStorage.setItem('serverUrl', serverUrl);
		service = new Config();

		expect(window.sessionStorage.getItem('serverUrl')).toBe(serverUrl);
		expect(service.baseUrl).toBe(serverUrl);
	});

	it('should baseUrl to be angular cli testing url http://localhost:9876 ', () => {
		const windowObj = {
			location: { protocol: 'http:', host: 'localhost:9876' }
		};

		expect(windowObj.location.protocol).toBe('http:');
		expect(windowObj.location.host).toBe('localhost:9876');
	});

	it('should apiUrl be defined', () => {
		expect(service.apiUrl).toBeDefined();
	});

	it('should apiUrl be equal to api ', () => {
		expect(service.apiUrl).toBe('/api');
	});

	it('should get full rest url location + api end point', () => {
		const baseUrl = {
			location: { protocol: 'http:', host: 'localhost:9876' }
		};
		const apiUrl = '/api';

		expect(service.restUrl).toBeDefined();
		expect(
			`${baseUrl.location.protocol}//${baseUrl.location.host}${apiUrl}`
		).toBe('http://localhost:9876/api');
	});
});
