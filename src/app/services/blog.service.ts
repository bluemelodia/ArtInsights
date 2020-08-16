import { Injectable } from '@angular/core';
import { urlForAction } from '../app.endpoints';
import { UserAction } from '../app.consts';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public tumblrUserURL = urlForAction(UserAction.FetchBlogs); 
  private tumblrUserSubject$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  get tumblrUserSub$() {
    return this.tumblrUserSubject$;
  }

  getTumblrUser() {
    this.http.get(this.tumblrUserURL)
      .subscribe((data: any) => {
        if (data) {
          console.log("RECEIVED USER DATA: ", data);
          this.tumblrUserSubject$.next(data);
        } else {
          throw new Error(`Login or registration failed.`);
        }
      }, 
      (error: Error) => {
        console.log("ERROR: ", error);
        this.tumblrUserSubject$.next(null);
      });
  }
}
