import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  numbers : number[] = [];

  onGameStart(num) {
    if(num % 2 ===0) {
      this.numbers.push(num);
    } else {
      this.numbers.push(num);
    }
  }
}
