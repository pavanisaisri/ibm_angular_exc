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
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DocsComponent } from './pages/docs/docs.component';
import { SupportComponent } from './pages/support/support.component';
import { Link1Component } from './pages/link1/link1.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		CatalogComponent,
		DocsComponent,
		SupportComponent,
		Link1Component,
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
	],
	exports: [
		ReactiveFormsModule
	],
	providers: [TableModel, PaginationModel],
	bootstrap: [AppComponent]
})
export class AppModule { }
