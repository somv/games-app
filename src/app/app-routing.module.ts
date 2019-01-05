import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoComponent } from './logo/logo.component';

const routes: Routes = [
	{ path: '', redirectTo: '/logo', pathMatch: 'full' },
	{ path: 'logo', component: LogoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
