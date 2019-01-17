import { Injectable, Injector } from '@angular/core';
import { Observable, EMPTY as empty, throwError as _throw, of } from 'rxjs';
import { Config } from '../config/config.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpRequest } from '@angular/common/http';

@Injectable()
export class GeneralHttpInterceptor implements HttpInterceptor {
	constructor(private config: Config, private injector: Injector) {}

	private setRequestOptions(req: HttpRequest<any>): HttpRequest<any> {
		return req.clone({
			withCredentials: true,
			setHeaders: {
				'Access-Control-Allow-Credentials': 'true'
			}
		});
	}

	private isUnauthorized(status: number): boolean {
		return status === 0 || status === 401 || status === 403;
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		return next.handle(this.setRequestOptions(req)).pipe(
			catchError((err, source) => {
				if (this.isUnauthorized(err.status)) {
					if (err instanceof HttpErrorResponse) {
						return _throw(err.message || 'backend server error');
					}
					return of();
				} else {
					return _throw(this.formatError(err));
				}
			})
		);
	}

	formatError(error: HttpErrorResponse) {
		if (error.status === 404) {
			return error.error.message ? `404 Not Found ${error.error.message}` : '404 Not Found';
		}
		return error.error.message || error.status;
	}
}
