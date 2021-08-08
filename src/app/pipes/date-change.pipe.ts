import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateChange'
})
export class DateChangePipe implements PipeTransform {
  transform(miliseconds: any): any {
    return new Date(miliseconds * 1000);
  }
}
