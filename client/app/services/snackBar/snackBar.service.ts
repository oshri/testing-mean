import { Injectable, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class SnackBar {
	constructor(
		@Inject(MatSnackBar) private snackBar: MatSnackBar
	) {}

	open(message: string, action?: string, duration: number = 3000) {
		this.snackBar.open(message, action, {
			duration: duration,
			panelClass: ['snack-bar-container', 'mean-theme']
		});
	}
}
