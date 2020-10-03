import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './services/auth.interceptor';

import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { AuthComponent } from './components/auth/auth.component';
import { BlogModule } from './components/blog/blog.module';
import { DeviantArtModule } from './components/deviantart/deviantart.module';
import { HeatmapModule } from './components/heatmap/heatmap.module';
import { HomeModule } from './components/home-dashboard/home.module';
import { LoginComponent } from './components/login/login.component';
import { NavModule } from './components/nav/nav.module';
import { TumblrModule } from './components/tumblr/tumblr.module';
import { TagModule } from './components/tag/tag.module';
import { LoaderComponent } from './components/loader/loader.component';
import { PipeModule } from './pipes/pipe.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AlertComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BlogModule,
    HomeModule,
    HeatmapModule,
    DeviantArtModule,
    NavModule,
    TagModule,
    TumblrModule,
    PipeModule,
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
