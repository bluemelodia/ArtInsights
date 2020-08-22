import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginGuard } from './routing/login.guard';
import { AuthGuard } from './routing/auth.guard';
import { TumblrComponent } from './components/home-dashboard/tumblr/tumblr.component';
import { HomeComponent } from './components/home-dashboard/home/home.component';
import { DeviantArtComponent } from './components/home-dashboard/deviantart/deviantart.component';
import { Media } from './app.consts';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'auth', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard, AuthGuard] },
  { 
    path: 'tumblr', 
    component: TumblrComponent, 
    canActivate: [LoginGuard, AuthGuard], 
    data: { media: [Media.Tumblr] } 
  },
  { 
    path: 'deviant-art', 
    component: DeviantArtComponent, 
    canActivate: [LoginGuard, AuthGuard],
    data: { media: [Media.DeviantArt] }
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full', canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
