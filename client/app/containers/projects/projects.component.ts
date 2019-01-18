import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ProjectsSrv } from '../../services/projects/projects.service';
import { SnackBar } from '../../services/snackBar/snackBar.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subject, Subscription } from 'rxjs';
import { IProject } from '../../../../models';
import { ProjectFormComponent } from '../../components/projectForm/projectForm.component';

@Component({
	selector: 'mean-projects',
	styleUrls: [ './projects.component.scss'],
	templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, OnDestroy {
	public projectsSubject$: Subject<IProject[]> = new Subject();
	private projectsSubscribe$: Subscription;
	private projects: IProject[];

	constructor(
		private projectsSrv: ProjectsSrv,
		private dialog: MatDialog,
		private snackBar: SnackBar
	) {}

	ngOnInit(): void {
		this.loadProjects();
	}

	loadProjects(): void {
		this.projectsSubscribe$ = this.projectsSrv.getProjects().subscribe((projects: IProject[]) => {
			this.projects = projects;
			this.projectsSubject$.next(projects);
		});
	}

	ngOnDestroy(): void {
		this.projectsSubscribe$.unsubscribe();
	}

	onRemove(projectName: string): void {
		this.projectsSrv.deleteProject(projectName).subscribe((res: any) => {
			this.projects = this.projects.filter((project: IProject) => project.name !== projectName);
			this.projectsSubject$.next(this.projects);
			this.snackBar.open(`The project ${projectName} was deleted`);
		}, (error: any) => this.snackBar.open(error.message));
	}

	openProjectDialog(project?: IProject): void {
		const dialogRef = this.dialog.open(ProjectFormComponent, {
			width: '500px',
			data: project ? project : {}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result.update) {
				this.loadProjects();
			}
		});
	}
}