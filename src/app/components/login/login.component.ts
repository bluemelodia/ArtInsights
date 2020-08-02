import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /* 
   * Creating these controls in this class gives us immediate access to 
   * listen for, update, and validate the state of the form input. 
   */
  emailControl = new FormControl('');
  passwordControl = new FormControl('');

  public newUser = true;

  constructor() { }

  ngOnInit() {
  }

  setLoginMode(isNewUser: boolean) {
    this.newUser = isNewUser;
  }
}
