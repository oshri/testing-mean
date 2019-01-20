import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError as _throw } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Config } from '../config/config.service';
import { IProject } from '../../models';

@Injectable()
export class ProjectsSrv {
	constructor(
		private config: Config,
		private router: Router,
		private http: HttpClient
	) {}

	getProjects(): Observable<IProject[]> {
		return this.http
			.get(`${this.config.restUrl}/projects`)
			.pipe(catchError((error: Response) => this.handleError(error)));
	}

	deleteProject(projectId: string): Observable<object> {
		return this.http.delete(`${this.config.restUrl}/projects/${projectId}`)
			.pipe(catchError((error: Response) => this.handleError(error)));
	}

	createProject(project: IProject): Observable<object> {
		return this.http.post(`${this.config.restUrl}/projects`, project)
			.pipe(catchError((error: Response) => this.handleError(error)));
	}

	updateProject(projectId: string, update: IProject): Observable<object> {
		return this.http.put(`${this.config.restUrl}/projects/${projectId}`, update)
			.pipe(catchError((error: Response) => this.handleError(error)));
	}

	isNameExist(projectName: string): Observable<boolean> {
		return this.http
			.get(`${this.config.restUrl}/projects/${projectName}/exist`)
			.pipe(
				map((res: { exist: boolean }): boolean => res.exist),
				catchError((error, caught) => {
					if (error.status === 404) {
						return of(false);
					}

					return caught;
				})
			);
	}

	private handleError(error: Response | any): Observable<any> {
		return _throw(error.message || error);
	}
}
