import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-remember',
  templateUrl: './remember.component.html',
  styleUrls: ['./remember.component.scss'],
  providers : [GamesService]
})
export class RememberComponent implements OnInit {


  constructor(private gamesService : GamesService) { }
  currentDirection = "up"
  answers : number[] = [];
  guesses : number[] = [];
  checkIndex : number = 0;
  showAnswer: number;
  gameStarted :boolean = false;
  fireflies = {
    1 : 'cyan',
    2 : 'green',
    3 : 'violet',
    4 : 'yellow'
  }
  //later change method so fireflies are not repeated more than 3 times in a row
  //also if a firefly hasn't been picked after 4 turns pick that firefly id
  ngOnInit() {
  }
  start() {
    this.gameStarted = true;
    this.answers = [];
    this.guesses = [];
    this.checkIndex = 0;
    this.showAnswer = 0;
    this.startGame();
  }
  stop() {
    this.gameStarted = false;
    this.answers = [];
    this.guesses = [];
    this.checkIndex = 0;
    this.showAnswer = 0;
  }
  fireflyClicked(id: any , color) {
    this.guesses.push(id);
    if(this.gameStarted) {
      if(this.answers[this.checkIndex] === this.guesses[this.checkIndex]) {
        this.showAnswer = id;
        this.playFirefly(this.fireflies[`${id}`]);
        this.pauseBetweenGuess();
        this.checkIndex++;
      } else {
        this.answers = [];
        this.guesses = [];
        this.checkIndex = 0;
        this.showAnswer = 0;
        this.gameStarted = false;
        return;
      }
      if(this.answers.length === this.checkIndex) {
        this.pauseBetweenTurns();
      }
    } else {
      this.guesses = [];
    }
  }
  addNewAnswer() {
    let newAnswer;
    let possibilities = [1,2,3,4]
    if(this.answers.length >= 2 && this.answers[this.answers.length-1] === this.answers[this.answers.length-2]) {
      possibilities.splice(this.answers[this.answers.length-2]-1,1);
      console.log('duplicate ignored', possibilities)
    }
    // if(this.answers.length > 5) {
    //   console.log('answers length is 6...')
    //   let found = 0;
    //   for (let p of possibilities) {
    //     console.log('in pos loop', p)
    //     for (let a of this.answers.splice(this.answers.length-6,6)) {
    //       console.log('in forech', a)
    //       if(p === a) {
    //         found++;
    //       }
    //     };
    //     console.log('found at end of loop', found)
    //     if(found > 0) {
    //       let index = possibilities.indexOf(p);
    //       console.log('before splice', index, possibilities)
    //       possibilities.splice(index,1);
    //       console.log('new pos after splice', possibilities)
    //     }
    //   };
    //   newAnswer = possibilities[(Math.floor((Math.random() * possibilities.length) + 1)) - 1]
    //   console.log(newAnswer)
    // } else {
    //   newAnswer = possibilities[(Math.floor((Math.random() * possibilities.length) + 1)) - 1]
    //   console.log(newAnswer)
    // }
    newAnswer = possibilities[(Math.floor((Math.random() * possibilities.length) + 1)) - 1]
    console.log(newAnswer)
    this.answers.push(newAnswer);
    this.displayAnswers(this.answers);
  }
  shortDelay() {
    return new Promise(resolve => setTimeout(resolve, 500));
  }
  longDelay() {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }
  async shortPause() {
    await this.shortDelay();
    this.showAnswer = 0;
  }
  async longPause() {
    await this.longDelay();
    this.showAnswer = 0;
  }
  async displayAnswers(answers : number[]) {
    for (const answer of answers) {
      this.showAnswer = answer;
      this.playFirefly(this.fireflies[`${answer}`])
      await this.shortPause();
      this.showAnswer = 0;
      await this.shortPause();
    }
  }
  async pauseBetweenTurns() {
    await this.longPause();
    this.guesses = [];
    this.checkIndex = 0;
    this.addNewAnswer();
  }
  async pauseBetweenGuess() {
    await this.shortPause();
    this.showAnswer = 0;
  }
  async startGame() {
    await this.longPause();
    this.addNewAnswer();
  }
  playFirefly(color) {
    let audio = new Audio();
    audio.src = `../../../assets/sounds/remember/${color}.wav`;
    audio.load();
    audio.play();
  }
}
