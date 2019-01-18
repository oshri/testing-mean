import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { projectNameValidator } from '../../validators/projectName/projectName.validator';
import { ProjectsSrv } from '../../services/projects/projects.service';
import { SnackBar } from '../../services/snackBar/snackBar.service';
import { IProject } from '../../../../models';

@Component({
	selector: 'mean-project-form',
	styleUrls: ['./projectForm.component.scss'],
	templateUrl: './projectForm.component.html'
})
export class ProjectFormComponent implements OnInit {
	public projectForm: FormGroup;
	isUpdate: boolean;
	
	constructor(
		@Inject(MatDialogRef) public dialogRef: MatDialogRef<any>,
		@Inject(MAT_DIALOG_DATA) public data: IProject,
		private projectsSrv: ProjectsSrv,
		private snackBar: SnackBar
	) {}

	ngOnInit() {
		this.createForm();
		this.loadForm(this.data);
	}

	public newProject() {
		const project: IProject = this.projectForm.value;
		if (this.isUpdate) {
			this.projectsSrv.updateProject(project).subscribe((res) => {
				this.snackBar.open(`Project ${project.name} was updated`);
				this.dialogRef.close({update: true});
			}, (err: any) => this.snackBar.open(`Project ${project.name} not updated`));
		} else {
			this.projectsSrv.createProject(project).subscribe((res) => {
				this.snackBar.open(`Project ${project.name} was created`);
				this.dialogRef.close({update: true});
			}, (err: any) => this.snackBar.open(`Project ${project.name} not created`));
		}
	}

	private createForm() {
		this.projectForm = new FormGroup({
			name: new FormControl('', [Validators.required], projectNameValidator(this.projectsSrv)),
			description: new FormControl('')
		});
	}

	private loadForm(initialData: IProject) {
		initialData.name ? this.isUpdate = true : this.isUpdate = false;

		const name = this.projectForm.get('name') as FormControl;
		name.setValue(initialData.name || '');

		const description = this.projectForm.get('description') as FormControl;
		description.setValue(initialData.description || '');
	}

}

