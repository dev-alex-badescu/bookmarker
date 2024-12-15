import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCategory',
  standalone: true,
})
export class DateCategoryPipe implements PipeTransform {
  transform(value: Date | string): string {
    const inputDate = new Date(value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (inputDate >= today) {
      return 'Today';
    } else if (inputDate >= yesterday && inputDate < today) {
      return 'Yesterday';
    } else {
      return 'Older';
    }
  }
}
