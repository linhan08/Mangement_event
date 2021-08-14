import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'date', pure: true })
export class PipeDate implements PipeTransform {
  transform(value: any) {
    var datePipe = new DatePipe("en-US");
     value = datePipe.transform(value, 'dd/MM/yyyy');
     return value;
 }
}
