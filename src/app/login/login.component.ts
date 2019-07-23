import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) { }
  loginForm = {
    email : '',
    password : ''
  }
  loginErrors = {
    userNotFound : '',
    wrongPassword : ''
  }

  ngOnInit() {
    this.resetForm();
  }

  login(userForm) {
    this.userService.loginUser(userForm.value);
    this.resetForm(userForm)
    this.router.navigate(['/meadow']);
  }

  resetForm(userForm?: NgForm) {
    if (userForm != null) {
      userForm.reset();
    }
  }

  logout() {
    this.userService.logout();
  }
}
