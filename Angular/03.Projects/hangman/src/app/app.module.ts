import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameControlComponent } from './game-control/game-control.component';
import { WordComponent } from './word/word.component';
import { DrawComponent } from './draw/draw.component';
import { DataServiceService } from './services/data-service.service';
import { GameServiceService } from './services/game-service.service';

@NgModule({
  declarations: [
    AppComponent,
    GameControlComponent,
    WordComponent,
    DrawComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [DataServiceService, GameServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
