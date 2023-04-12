import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list:any[], filterText:string): any {
    return list ? list.filter(item => item.songName.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
