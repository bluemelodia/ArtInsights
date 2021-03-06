import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { LoginPostResponse } from '../auth/auth.types';
import { Subscription, ReplaySubject, Observable } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { AlertType, UserAction } from '../../app.consts';
import { takeUntil } from 'rxjs/operators';
import { RedirectService } from '../../services/redirect.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 

  public newUser = true;
  private login$: Observable<LoginPostResponse>;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private routeObserver: Subscription;

  constructor(
    private alert: AlertService,
    private fb: FormBuilder, 
    private login: LoginService,
    private loading: LoadingService,
    private redirect: RedirectService,
    private router: Router) {
      this.routeObserver = this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe(event => {
        console.log("Nav ending, should we logout? ", event);
        if (event instanceof NavigationEnd) {     
          if (event.url === "/login" || event.urlAfterRedirects === "/login") {
            /* Kill the previous session. */
            console.log("Nav ending, log out!");
            this.login.logoutUser();
            this.loading.hideLoader();
          } 
        }
      });
    }

  ngOnInit() {
    /* 
    * The FormGroup instance provides its model value as an object reduced from the 
    * values of each control in the group. Form group instances have the same properties
    * (ex. value, untouched) and methods as a form control instance.
    * 
    * It tracks the status/changes for each control - so if one control changes, the parent
    * control also emits a new status/value change. The model for the group is maintained
    * from its members.  
    * 
    * Creating these FormControl controls in this class gives us immediate access to 
    * listen for, update, and validate the state of the form input. 
    */
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9_.!@#*\-]*$')]]
    });
    this.setupLoginSubscription();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /* Returns the form controls of the login form. */
  get loginFormControl() {
    return this.loginForm.controls;
  }

  public setupLoginSubscription() {
    this.login$ = this.login.login$;
    this.login$
      .subscribe((response: LoginPostResponse) => {
        if (response && response.statusCode === 0) {
          console.info("Login/registration successful for ", response);
          let message = '';
          switch(response.userAction) {
            case UserAction.Login:
              message = 'Welcome to Art Insights!';
              console.info("Navigate to auth page");
              this.redirect.route('/auth');
              break;
            case UserAction.Register:
              message = 'Registration successful. Please log in using your credentials.';
              break;
          }
          this.alert.showAlert(AlertType.Success, message);
        } else {
          console.info("Login failed for: ", response);
          this.alert.showAlert(AlertType.Error, response.errorMsg ? response.errorMsg : "An error occured. Please try again.");
        }
      });
  }

  setLoginMode(isNewUser: boolean) {
    this.newUser = isNewUser;
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (this.newUser) {
      this.login.registerUser(email, password);
    } else {
      this.login.loginUser(email, password);
    }
  }
}
