import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {

  constructor(private gameService: GameServiceService) { }

  //SUBSCRIBING TO THE GAME EVENTS
  ngOnInit() {
    this.gameService.gameStart.subscribe(
      (gameObj) => {
        this.renderHangmanLine(gameObj.lives);
      }
    )

    this.gameService.gameProgress.subscribe(
      (gameObj) => {
        this.renderHangmanLine(gameObj.lives);
      }
    )
  }

  renderHangmanLine(lives) {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.strokeStyle = '#000000';
    context.beginPath();
  
    switch(lives) {
      case 10:
        context.clearRect(0, 0, canvas.width, canvas.height);
      break;
      case 9:
        context.moveTo(50, 300);
        context.lineTo(50, 20);
      break;
      case 8:
        context.moveTo(50, 20);
        context.lineTo(110, 20);
      break;
      case 7:
        context.moveTo(110, 20);
        context.lineTo(110, 50);
      break;
      case 6:
        context.moveTo(110, 50);
        context.arc(110, 60, 10, 1.5*Math.PI, 3.5*Math.PI);
      break;
      case 5:
        context.moveTo(110, 70);
        context.lineTo(110, 80);
      break;
      case 4:
        context.moveTo(110, 80);
        context.lineTo(140, 55);
      break;
      case 3:
        context.moveTo(110, 80);
        context.lineTo(80, 55);
      break;
      case 2:
        context.moveTo(110, 80);
        context.lineTo(110, 105);
      break;
      case 1:
        context.moveTo(110, 105);
        context.lineTo(125, 140);
      break;
      case 0:
        context.moveTo(110, 105);
        context.lineTo(95, 140);
      break;
    }
    context.stroke();
  }
}
