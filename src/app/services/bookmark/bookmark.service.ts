import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBookmark } from '../../models/IBookmark.model';
import { RepositoryService } from '../repository/repository.service';
import { BaseUrls } from '../../shared/consts/baseUrls.const';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private bookmarksUrl = BaseUrls.BOOKMARKS;

  constructor(private repositoryService: RepositoryService) {}

  getBookmarks(): Observable<IBookmark[]> {
    return this.repositoryService.getAll<IBookmark>(this.bookmarksUrl);
  }

  createBookmark(bookmark: IBookmark): Observable<IBookmark> {
    return this.repositoryService.create<IBookmark>(
      bookmark,
      this.bookmarksUrl
    );
  }

  updateBookmark(bookmark: IBookmark): Observable<void> {
    return bookmark.id
      ? this.repositoryService.update<IBookmark>(
          bookmark.id,
          bookmark,
          this.bookmarksUrl
        )
      : of();
  }

  deleteBookmark(id: number): Observable<void> {
    return this.repositoryService.delete(id, this.bookmarksUrl);
  }

  getBookmark(id: number): Observable<IBookmark> {
    return this.repositoryService.getById<IBookmark>(id, this.bookmarksUrl);
  }
}
