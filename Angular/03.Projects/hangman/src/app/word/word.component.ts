import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { Word } from '../models/word.model';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  word: Word;
  lives: number = 10;
  status: string;

  constructor(private gameService: GameServiceService) { }

  //SUBSCRIBING TO THE GAME EVENTS
  ngOnInit() {
    this.gameService.gameStart.subscribe(
      (gameObj) => {
        this.lives = gameObj.lives;
        this.status = gameObj.status;
        this.word = gameObj.word;
      }
    )

    this.gameService.gameProgress.subscribe(
      (gameObj) => {
        if(gameObj.status === 'win') {
          this.status = 'win';
        } else if(gameObj.status === 'lose') {
          this.status = 'lose';
        } else if(gameObj.status === 'inProgress') {
          this.lives = gameObj.lives;
        }
      }
    )
  }
}
