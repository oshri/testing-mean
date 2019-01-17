import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './containers/projects/projects.component';
export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ProjectsComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			anchorScrolling: 'enabled',
			enableTracing: false
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
