import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './services/auth.interceptor';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AlertComponent } from './components/alert/alert.component';
import { NavModule } from './components/nav/nav.module';
import { LoginComponent } from './components/login/login.component';
import { HomeModule } from './components/home-dashboard/home.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AlertComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    NavModule,
    ReactiveFormsModule
  ],
  /* We can have several different interceptors, which is why we provide the interceptor
   * service with the option multi: true. */
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
