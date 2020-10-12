import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
