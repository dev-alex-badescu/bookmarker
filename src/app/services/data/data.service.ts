import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}
  createDb(): {} | Observable<{}> {
    return {
      bookmarks: [
        {
          id: 1,
          name: 'Angular',
          url: 'https://angular.io/',
          createdAt: this.getDateDaysAgo(),
          updatedAt: this.getDateDaysAgo(),
        },
        {
          id: 2,
          name: 'NgRx',
          url: 'https://ngrx.io/',
          createdAt: this.getDateDaysAgo(1),
          updatedAt: this.getDateDaysAgo(1),
        },
        {
          id: 3,
          name: 'Typescript - Javacript that scales',
          url: 'https://www.typescriptlang.org/',
          createdAt: this.getDateDaysAgo(2),
          updatedAt: this.getDateDaysAgo(2),
        },
        {
          id: 4,
          name: 'RxJS - A reactive programming library for JavaScript',
          url: 'https://rxjs.dev/',
          createdAt: this.getDateDaysAgo(4),
          updatedAt: this.getDateDaysAgo(4),
        },
      ],
    };
  }

  private getDateDaysAgo(daysAgo: number = 0) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
  }
}
