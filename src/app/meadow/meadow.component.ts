import { Component, OnInit } from '@angular/core';
import { FireflyService } from '../services/firefly.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Firefly } from '../models/firefly.model';
import { UserProfile } from '../models/userprofile.model';



@Component({
  selector: 'app-meadow',
  templateUrl: './meadow.component.html',
  styleUrls: ['./meadow.component.scss'],
  providers: [FireflyService, UserService]
})
export class MeadowComponent implements OnInit {

  constructor(private fireflyService : FireflyService, private userService : UserService, private router : Router) { }
  fireflies: Firefly = null;
  userInfo: UserProfile = null;
  fireflySample = {
    $key : null,
    uid : '',
    sound : 'violet.wav',
    image : 'violet.png',
    note : 'A',
    octive : 1
  }
  //adjust models to represent queries to db, make model for userInfo...
  //use correct lifecycle hooks for getting user info
  // let audio = new Audio();
  //   audio.src = `../../../assets/sounds/remember/${color}.wav`;
  //   audio.load();
  //   audio.play();
  ngOnInit() {
    this.getLoggedUser()
      .then((value) => {
        this.userInfo = value
        this.updateFireflies();
      })
  }

  async getLoggedUser() {
    return await this.userService.getLoggedUser();
  }

  test() {
    this.fireflyService.insertFirefly(this.fireflySample, this.userInfo.uid);
    this.updateFireflies();
  }
  
  updateFireflies() {
    this.fireflyService.getAllFireflies(this.userInfo.uid)
    .then ( value => {
      this.fireflies = value;
      console.log('total fireflies', this.fireflies)
      });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
