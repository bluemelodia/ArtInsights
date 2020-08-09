import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 

  public newUser = true;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService) { }

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
  }

  /* Returns the form controls of the login form. */
  get loginFormControl() {
    console.log(this.loginForm.controls);
    return this.loginForm.controls;
  }

  setLoginMode(isNewUser: boolean) {
    this.newUser = isNewUser;
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (this.newUser) {
      this.auth.registerUser(username, password);
    } else {
      this.auth.loginUser(username, password);
    }
  }
}
