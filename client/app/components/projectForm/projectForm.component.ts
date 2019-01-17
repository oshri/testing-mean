import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { projectNameValidator } from '../../validators/projectName/projectName.validator';
import { ProjectsSrv } from '../../services/projects/projects.service';
import { IProject } from '../../../../models';

@Component({
	selector: 'mean-project-form',
	styleUrls: ['./projectForm.component.scss'],
	templateUrl: './projectForm.component.html'
})
export class ProjectFormComponent implements OnInit {
	public projectForm: FormGroup;
	
	constructor(
		@Inject(MatDialogRef) public dialogRef: MatDialogRef<any>,
		@Inject(MAT_DIALOG_DATA) public data: IProject,
		private projectsSrv: ProjectsSrv
	) {}

	ngOnInit() {
		this.createForm();
		this.loadForm(this.data);
	}

	public newProject() {

		// this.dialogRef.close();
	}

	private createForm() {
		this.projectForm = new FormGroup({
			name: new FormControl('', [Validators.required], projectNameValidator(this.projectsSrv)),
			description: new FormControl('')
		});
	}

	private loadForm(initialData: IProject) {
		const name = this.projectForm.get('name') as FormControl;
		name.setValue(initialData.name || '');

		const description = this.projectForm.get('description') as FormControl;
		description.setValue(initialData.description || '');
	}

}

