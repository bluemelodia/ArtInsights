import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginGuard } from './routing/login.guard';
import { LogoutGuard } from './routing/logout.guard';
import { AuthGuard } from './routing/auth.guard';
import { HomeComponent } from './components/home-dashboard/home/home.component';
import { DeviantArtComponent } from './components/deviantart/deviantart.component';
import { Media } from './app.consts';
import { TumblrComponent } from './components/tumblr/tumblr.component';
import { TagComponent } from './components/tag/tag.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: 'auth', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'home', 
    canActivate: [LoginGuard, AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent 
      },
      { 
        path: 'tumblr', 
        component: TumblrComponent, 
        data: { media: [Media.Tumblr] } 
      },
      { 
        path: 'deviant-art', 
        component: DeviantArtComponent, 
        data: { media: [Media.DeviantArt] }
      },
      { 
        path: 'tags',
        component: TagComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
