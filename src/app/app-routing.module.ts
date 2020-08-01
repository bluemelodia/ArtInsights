import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowComponent } from './components/follows/follow/follow.component';

const routes: Routes = [
  { path: 'following', component: FollowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
