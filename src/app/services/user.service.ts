import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProfile } from '../models/userprofile.model';

@Injectable()
export class UserService {
  selectedUID: string;
  loggedInUID: string;
  testing: {};
  constructor(private firebase : AngularFireDatabase, private firebaseAuth : AngularFireAuth) { }

  registerUser(userForm) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(userForm.email, userForm.password)
      .then(value => {
        this.loggedInUID = value.uid;
        console.log('logged uid in reg', this.loggedInUID)
        this.firebase.list('userprofiles').push({
          uid: value.uid,
          username: userForm.username,
          birthday: userForm.birthday
        });
      })
      .catch(err => {
        return err.message;
      });
  }

  loginUser(userForm) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(userForm.email, userForm.password)
      .then (value => {
        this.loggedInUID = value.uid
        console.log('logged uid in login', this.loggedInUID)
      })
      .catch(err => {
         console.log('err', err.message)
      });
  }

  getLoggedUser() {
    return new Promise((resolve) => {
      this.firebaseAuth.auth.onAuthStateChanged(user => {
        let dbUser
        if(user) {
          dbUser = this.firebase.list('userprofiles', ref => {
            return ref.orderByChild('uid').equalTo(user.uid);
          })
        }
        dbUser.snapshotChanges().subscribe(item => {
          return resolve(item[0].payload.val());
        })
      })
    }).then((value) => {
      return value
    })
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    this.loggedInUID = '';
    console.log('logged out', this.firebaseAuth.auth.currentUser, this.loggedInUID)
  }



}
