import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
    name: 'myFirstPipe'
})
export class MyFirstPipe implements PipeTransform {
  transform(value: number, multiply: number): number {
    return value * multiply;
  }
}