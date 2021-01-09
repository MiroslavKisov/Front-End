import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.scss']
})
export class GameControlComponent implements OnInit {

  controlsNonActive: boolean = true;
  constructor(private gameService: GameServiceService) { }

  //SUBSCRIBING TO THE GAME EVENTS
  ngOnInit() {
    this.gameService.gameStart.subscribe(
      () => {
        this.controlsNonActive = false
      }
    )

    this.gameService.gameProgress.subscribe(
      (gameObj) => {
        if(gameObj.status === 'win' || gameObj.status === 'lose') {
          this.controlsNonActive = true;
        }  
      }
    );
  }

  start() {
    this.gameService.runGame();
  }

  play(event) {
    let letter = event.target.innerHTML;
    this.gameService.chooseLetter(letter);
  }
}
