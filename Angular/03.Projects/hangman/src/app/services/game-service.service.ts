import { Injectable, EventEmitter } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { Word } from '../models/word.model';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  //SINGNALS THE START OF THE GAME
  gameStart = new EventEmitter<{ word: Word, status: string, lives: number }>();

  //UPDATES THE GAME PROGRESS
  gameProgress = new EventEmitter<{ status: string, lives: number }>();

  private words: Word[] = [];
  private currentWord: Word;
  private lives: number;
  private index: number;

  constructor(private dataService: DataServiceService) { }

  //GENERATES RANDOM WORD
  private getRandomWord() {
    this.words = this.dataService.getData()
    this.index = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[this.index];
    return this.currentWord;
  }

  //CHECKS IF THE SELECTED LETTER IS CONTAINED WITHIN THE WORD
  private filterWord(letter: string) {
    let isfound = false;

    for(let element of this.currentWord.content) {
      if(element.letter === letter) {
        element.isGuessed = true;
        isfound = true;
      }
    }

    if(isfound === false) {
      this.lives -= 1;
    }

    this.checkGameStatus();
  }

  private isGuessed(letter) {
    return letter.isGuessed === true;
  }

  //CHECKS THE CURRENT PROGRESS OF THE GAME AND EMITS THE CORRESPONDING EVENT
  private checkGameStatus() {
    if(this.currentWord.content.every(this.isGuessed) === true && this.lives > 0) {
      this.gameProgress.emit({ status: 'win', lives: this.lives });
      this.words.splice(this.index, 1);
    } else if(this.currentWord.content.every(this.isGuessed) === false && this.lives === 0) {
      this.gameProgress.emit({ status: 'lose', lives: this.lives });
    } else {
      this.gameProgress.emit({ status: 'inProgress', lives: this.lives });
    }
  }

  //STARTS THE GAME AND EMITS THE CORRESPONDING EVENT
  runGame() {
    this.lives = 10;
    this.gameStart.emit({word: this.getRandomWord(), status: 'inProgress', lives: this.lives });
  }

  //SELECTS LETTER
  chooseLetter(letter) {
    this.filterWord(letter);
  }
}
