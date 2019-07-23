import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers : [UserService]

})
export class RegisterComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) { }
  regForm = {
    username : '',
    email : '',
    password : '',
    passCheck : '',
    birthday : ''
  }
  regErrors = {
    email : '',
    password : ''
  }
  sectionStatuses = {
    username : 'current',
    birthday : 'hidden',
    login : 'hidden'
  }

  ngOnInit() {
    this.resetForm();
  }

  nextSection(section) {
    let keys = Object.keys(this.sectionStatuses)
    for (let i = 0; i < keys.length; i++) {
      if(section === keys[i]) {
        this.sectionStatuses[`${section}`] = 'finished';
        this.sectionStatuses[`${keys[i + 1]}`] = 'current';
      }
    }
  }
  previousSection(section) {
    let keys = Object.keys(this.sectionStatuses)
    for (let i = 0; i < keys.length; i++) {
      if(section === keys[i]) {
        this.sectionStatuses[`${section}`] = 'hidden';
        this.sectionStatuses[`${keys[i + -1]}`] = 'current';
      }
    }
  }
  register(userForm) {
    this.userService.registerUser(userForm.value);
    this.resetForm(userForm)
    this.router.navigate(['/meadow']);
  }
  resetForm(userForm?: NgForm) {
    if (userForm != null) {
      userForm.reset();
    }
  }
}
