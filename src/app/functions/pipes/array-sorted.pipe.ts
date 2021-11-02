import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySorted'
})
export class ArraySortedPipe implements PipeTransform {
    transform(array: Array<any>, args: string): Array<any> {
        array = array || []; // set to an empty array if undefined
        return array.sort((a: any, b: any) => {
            if (a[args] < b[args]) {
                return -1;
            } else if (a[args] > b[args]) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}