import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DocsComponent } from './pages/docs/docs.component';
import { SupportComponent } from './pages/support/support.component';
import { Link1Component } from './pages/link1/link1.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./starter-home/starter-home.module').then(m => m.StarterHomeModule)
	},
	{
		path: 'createForm',
		component: CreateFormComponent
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
