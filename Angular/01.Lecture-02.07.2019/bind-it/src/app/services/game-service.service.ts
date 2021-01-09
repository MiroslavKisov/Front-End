import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  n : number;
  interval : any;

  constructor() { }

  setValue(number : number) {
    this.n = number
  }

  startGame(emitter : EventEmitter<number>) {
    let _this = this;
    this.interval = setInterval(function() {
      emitter.emit(_this.n++);
    }, 1000);
  }

  stopGame() {
    clearInterval(this.interval);
  }
}
