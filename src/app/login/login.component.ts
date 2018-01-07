import {Component, EventEmitter, OnInit, Output} from '@angular/core';

export interface LoginDetails {
  username?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() login = new EventEmitter();

  userDetails: LoginDetails = {};

  onLogin() {
    this.login.emit(this.userDetails);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
