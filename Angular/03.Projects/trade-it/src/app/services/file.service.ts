import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  //Converts an image into 64 base string.
  upload(pictureData) {
      return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onloadend = x => resolve(fr.result);
        fr.readAsDataURL(pictureData);
    })
  }
}
