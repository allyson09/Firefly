import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Game } from '../models/game.model';

@Injectable()
export class GamesService {
  gameList: AngularFireList<any>;
  selectedGame: Game = new Game();
  constructor(private firebase : AngularFireDatabase ) { }

  getData() {
    this.gameList = this.firebase.list('Games');
    return this.gameList;
  }
}
