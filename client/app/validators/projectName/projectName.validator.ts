import {
	AbstractControl,
	FormControl,
	ValidatorFn,
	AsyncValidatorFn
} from '@angular/forms';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ProjectsSrv } from '../../services/projects/projects.service';

export function projectNameValidator(
	projectsSrv: ProjectsSrv
): AsyncValidatorFn {
	return (control: AbstractControl): Observable<ValidationErrors | null> => {
		
		if (control.value == null || typeof control.value !== 'string') {
			return null;
		}

		return timer(250).pipe(
			switchMap(() => projectsSrv.isNameExist(control.value)),
			map(
				(nameExists: boolean) =>
				nameExists
						? { nameExists: { value: control.value } }
						: null
			)
		);
	};
}