import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowComponent } from './components/follows/follow/follow.component';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginGuard } from './routing/login.guard';
import { AuthGuard } from './routing/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'auth', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'home', component: FollowComponent, canActivate: [LoginGuard] },
  { path: 'following', component: FollowComponent, canActivate: [LoginGuard, AuthGuard] },
  { path: '',   redirectTo: '/login', pathMatch: 'full', canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
