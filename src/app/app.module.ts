import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ManageFollowsModule } from './manage-follows/manage-follows.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavItemComponent } from './nav-item/nav-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ManageFollowsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
