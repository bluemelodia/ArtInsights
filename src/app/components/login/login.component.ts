import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { LoginPostResponse } from '../auth/auth.types';
import { Subject } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { AlertType, UserAction } from '../../app.consts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 

  public newUser = true;
  private loginSubject$: Subject<LoginPostResponse>;

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder, 
    private login: LoginService,
    private router: Router) { }

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
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.setupLoginSubscription();
  }

  /* Returns the form controls of the login form. */
  get loginFormControl() {
    return this.loginForm.controls;
  }

  public setupLoginSubscription() {
    this.loginSubject$ = this.login.loginSubject$;
    this.loginSubject$
      .subscribe((response: LoginPostResponse) => {
        if (response && response.statusCode === 0) {
          console.info("Login/registration successful for ", response);
          let message = '';
          switch(response.userAction) {
            case UserAction.Login:
              message = 'Welcome to Art Insights!';
              console.info("Navigate to auth page");
              this.router.navigateByUrl('/auth');
              break;
            case UserAction.Register:
              message = 'Registration successful. Please log in using your credentials.';
              break;
          }
          this.alertService.showAlert(AlertType.Success, message);
        } else {
          console.info("Login failed for: ", response);
          this.alertService.showAlert(AlertType.Error, response.errorMsg ? response.errorMsg : "An error occured. Please try again.");
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
