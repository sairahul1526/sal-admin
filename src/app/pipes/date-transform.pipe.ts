import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  transform(original: string, converted: string): unknown {
    return moment.utc(original).local().format(converted);
  }

}
