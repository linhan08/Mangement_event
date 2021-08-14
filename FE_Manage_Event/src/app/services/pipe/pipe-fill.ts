import { Artist } from 'src/app/models/admin/artist.model';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'orderBys' })
export class PipeFill implements PipeTransform {
  transform(array: Artist[], value: string): Artist[] {
    array.sort((a: any, b: any) => {
      if (a[value] < b[value]) {
        return -1;
      } else if (a[value] > b[value]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
