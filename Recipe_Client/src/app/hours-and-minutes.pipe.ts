import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursAndMinutes',
  standalone: true
})
export class HoursAndMinutesPipe implements PipeTransform {

  transform(value: number): string {
    if(value > 0 && value/60 < 1) {
      return value + ' minutes';

    } else {
      const hours = Math.floor(value / 60);
      const remainingMinutes = value % 60;
      return `${hours} hours and ${remainingMinutes} minutes`;
    }
  }

}
