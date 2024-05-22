import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filteredStatus: string, property: string): any {
    // console.log('filter', value, filteredStatus, property);
    
    if (value.length === 0 || filteredStatus === '') {
      // console.log('returning value', value);
      return value;
    }
    let retArr = [];
    for (let server of value) {
      if (server[property] === filteredStatus) {
        retArr.push(server);
      }
    }
    // console.log('returning retArr', retArr);
    return retArr;
  }

}
