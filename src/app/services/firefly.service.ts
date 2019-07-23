import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Firefly } from '../models/firefly.model';

@Injectable()
export class FireflyService {
  allFireflies: Firefly[];
  selectedFirefly: Firefly = new Firefly();

  constructor(private firebase : AngularFireDatabase) { }

  insertFirefly(firefly : Firefly, uid : string) {
    this.firebase.list('fireflies').push({
      uid : `${uid}`,
      sound : firefly.sound,
      image : firefly.image,
      note : firefly.note,
      octive : firefly.octive
    })
  }

  getAllFireflies(uid : string) {
    return new Promise( (resolve) => {
      let dbFireflies = this.firebase.list('fireflies', ref => {
        return ref.orderByChild("uid").equalTo(`${uid}`);
      });
      dbFireflies.snapshotChanges().subscribe(item => {
        let allFireflies = [];
        item.forEach(element => {
          let jsonFirefly = element.payload.toJSON();
          jsonFirefly["$key"] = element.key;
          allFireflies.push(jsonFirefly as Firefly);
        });
        return resolve(allFireflies);
      });
    })
      .then ( value => {
        return value;
      });
  }

}
