import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'id'
})
export class IdPipe implements PipeTransform {

  transform(value: number): string {
    let string = ''
    for(let i = 0; i < 3 - value.toString().length; i++) {
      string = string.concat('0')
    }
    string = string.concat(value.toString())
    return string;
  }

}
