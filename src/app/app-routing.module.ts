import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

const routes: Routes = [
	{ path: '', redirectTo: '/tic-tac-toe', pathMatch: 'full' },
	{ path: 'logo', component: LogoComponent },
	{ path: 'tic-tac-toe', component: TicTacToeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
