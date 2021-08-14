import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';

@Pipe({ name: 'phone' })
export class PipePhone implements PipeTransform {
  transform(value: string): string {
    return `(+84) ${value.replace(/-/g, '')}`;
  }
  // transform(phoneValue: number | string): string {
  //   const stringPhone = phoneValue + '';
  //   const phoneNumber = parsePhoneNumber(stringPhone, 'VN');
  //   const formatted = phoneNumber.formatNational();
  //   return formatted;
  // }
}
