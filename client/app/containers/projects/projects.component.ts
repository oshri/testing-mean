import { Component, OnInit } from '@angular/core';
import { ProjectsSrv } from '../../services/projects/projects.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { IProject } from '../../../../models';
import { ProjectFormComponent } from '../../components/projectForm/projectForm.component';

@Component({
	selector: 'mean-projects',
	styleUrls: [ './projects.component.scss'],
	templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
	public projects$: Observable<IProject[]>;

	constructor(
		private projectsSrv: ProjectsSrv,
		public dialog: MatDialog
	) {}

	ngOnInit(){
		this.projects$ = this.projectsSrv.getProjects();
	}

	openProjectDialog(project: IProject) {
		const dialogRef = this.dialog.open(ProjectFormComponent, {
			width: '500px',
			height: '600px',
			data: project
		});

		dialogRef.afterClosed().subscribe(result => {});
	}
}