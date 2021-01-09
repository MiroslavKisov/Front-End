import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit {
  
  num : number = 0;

  @Output() gameStart = new EventEmitter<number>();

  constructor(private gameService : GameServiceService) {
    this.gameService.setValue(this.num);
  }

  ngOnInit() {
  }

  start() {
    this.gameService.startGame(this.gameStart);
  }

  stop() {
    this.gameService.stopGame();
  }
}
