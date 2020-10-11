import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// carbon-components-angular default imports
import { UIShellModule, 
	GridModule, 
	ListModule,
	TabsModule,
	TilesModule,
	DropdownModule,
	CheckboxModule,
	RadioModule,
	InputModule, 
	PaginationModule,
	PaginationModel,
	TableModel,
	TableModule,
	NFormsModule } from 'carbon-components-angular';
import { Notification20Module } from '@carbon/icons-angular/lib/notification/20';
import { UserAvatar20Module } from '@carbon/icons-angular/lib/user--avatar/20';
import { AppSwitcher20Module } from '@carbon/icons-angular/lib/app-switcher/20';
import { HeaderComponent } from './header/header.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DataServiceService } from './services/data-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		CreateFormComponent,
		DashboardComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		UIShellModule,
		Notification20Module,
		UserAvatar20Module,
		AppSwitcher20Module,
		GridModule,
		ListModule,
		TabsModule,
		TilesModule,
		DropdownModule,
		RadioModule,
		InputModule,
		CheckboxModule,
		PaginationModule,
		PaginationModule,
		TableModule,
		NFormsModule,
		HttpClientModule
	],
	exports: [
		ReactiveFormsModule
	],
	providers: [TableModel, PaginationModel, DataServiceService],
	bootstrap: [AppComponent]
})
export class AppModule { }
