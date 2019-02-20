import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './containers/projects/projects.component';
import { NotFoundComponent } from './containers/notFound/notFound.component';
export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ProjectsComponent
	},
	{ path: '**', component: NotFoundComponent }
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
