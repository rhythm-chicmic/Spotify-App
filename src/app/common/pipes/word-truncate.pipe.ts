import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordTruncate'
})
export class WordTruncatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if(value.length>28){
      value = value.slice(0,28)
    
      value+='..'
    }
    return value;
  }

}
