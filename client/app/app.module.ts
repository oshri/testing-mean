import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './appRouting.module';

// Services
import { Config } from './services/config/config.service';
import { GeneralHttpInterceptor } from './services/httpInterceptor/httpInterceptor.service';
import { ProjectsSrv } from './services/projects/projects.service';
import { SnackBar } from './services/snackBar/snackBar.service';

// Containers
import { AppComponent } from './containers/app/app.component';
import { ProjectsComponent } from './containers/projects/projects.component';

// Components
import { ProjectFormComponent } from './components/projectForm/projectForm.component';
import { NotFoundComponent } from './containers/notFound/notFound.component';

export const IMPORT = [
	AppRoutingModule,
	BrowserModule,
	BrowserAnimationsModule,
	RouterModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	FlexLayoutModule,
	MaterialModule
];

export const PROVIDERS = [
	Config,
	ProjectsSrv,
	SnackBar,
	{
		provide: HTTP_INTERCEPTORS,
		useClass: GeneralHttpInterceptor,
		multi: true
	}
];

export const COMPONENTS = [ProjectFormComponent, NotFoundComponent];

export const CONTAINERS = [AppComponent, ProjectsComponent];

@NgModule({
	imports: IMPORT,
	declarations: [...COMPONENTS, ...CONTAINERS],
	providers: PROVIDERS,
	entryComponents: [ProjectFormComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}
