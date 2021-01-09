import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'To Do App';
  val='';
  values = [];

  submit() {
    if(this.val === '') {
      alert("Value cannot be empty!");
    } else {
      this.values.push(this.val);
      this.val = '';
    }
  }

  edit(index) {
    this.val = this.values[index];
  }

  del(index) {
    this.values.splice(index, 1);
  }
}
