import { Injectable } from '@angular/core';
import { Word } from '../models/word.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  words: Word[] = [
    new Word([
      { letter: 'S', isGuessed: false }, 
      { letter: 'O', isGuessed: false }, 
      { letter: 'F', isGuessed: false }, 
      { letter: 'I', isGuessed: false }, 
      { letter: 'A', isGuessed: false }
    ], 
      'The capitol city of Bulgaria',
      'Sofia'),
    new Word([
      { letter: 'R', isGuessed: false }, 
      { letter: 'I', isGuessed: false }, 
      { letter: 'O', isGuessed: false }, 
      { letter: 'D', isGuessed: false }, 
      { letter: 'E', isGuessed: false },
      { letter: 'J', isGuessed: false },
      { letter: 'A', isGuessed: false },
      { letter: 'N', isGuessed: false },
      { letter: 'E', isGuessed: false },
      { letter: 'I', isGuessed: false },
      { letter: 'R', isGuessed: false },
      { letter: 'O', isGuessed: false },
    ], 
      'The capitol city of Brasil',
      'Rio De Janeiro'),
    new Word([
      { letter: 'N', isGuessed: false }, 
      { letter: 'E', isGuessed: false }, 
      { letter: 'W', isGuessed: false }, 
      { letter: 'Y', isGuessed: false }, 
      { letter: 'O', isGuessed: false },
      { letter: 'R', isGuessed: false }, 
      { letter: 'K', isGuessed: false }, 
    ], 
      'The big apple',
      'New York'),
    new Word([
      { letter: 'A', isGuessed: false }, 
      { letter: 'L', isGuessed: false }, 
      { letter: 'B', isGuessed: false }, 
      { letter: 'E', isGuessed: false }, 
      { letter: 'R', isGuessed: false },
      { letter: 'T', isGuessed: false }, 
      { letter: 'A', isGuessed: false },
      { letter: 'I', isGuessed: false },
      { letter: 'N', isGuessed: false },
      { letter: 'S', isGuessed: false },
      { letter: 'T', isGuessed: false },
      { letter: 'E', isGuessed: false },
      { letter: 'I', isGuessed: false },
      { letter: 'N', isGuessed: false }, 
    ], 
      'The creator of the theory of relativity',
      'Albert Einstein'),
    new Word([
      { letter: 'B', isGuessed: false }, 
      { letter: 'L', isGuessed: false }, 
      { letter: 'A', isGuessed: false }, 
      { letter: 'C', isGuessed: false }, 
      { letter: 'K', isGuessed: false },
      { letter: 'H', isGuessed: false }, 
      { letter: 'O', isGuessed: false },
      { letter: 'L', isGuessed: false },
      { letter: 'E', isGuessed: false }, 
    ], 
      'The heaviest object in the universe',
      'Black Hole'),
    new Word([
      { letter: 'B', isGuessed: false }, 
      { letter: 'R', isGuessed: false }, 
      { letter: 'E', isGuessed: false }, 
      { letter: 'N', isGuessed: false }, 
      { letter: 'D', isGuessed: false },
      { letter: 'A', isGuessed: false }, 
      { letter: 'N', isGuessed: false },
      { letter: 'E', isGuessed: false },
      { letter: 'I', isGuessed: false },
      { letter: 'C', isGuessed: false },
      { letter: 'H', isGuessed: false }, 
    ], 
      'The creator of JavaScript',
      'Brendan Eich')
  ]

  constructor() { }

  //EXPORTS THE DATA OBJECT
  getData() {
    return this.words;
  }
}
