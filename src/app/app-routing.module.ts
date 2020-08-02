import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowComponent } from './components/follows/follow/follow.component';
import { Authentication } from './routing/auth';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'following', component: FollowComponent, canActivate: [Authentication] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
