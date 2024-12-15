import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookmarkCardComponent } from '../../shared/components/bookmark-card/bookmark-card.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { IBookmark } from '../../models/IBookmark.model';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app/app.state';
import { loadBookmarks } from '../../state/bookmark/bookmark.actions';
import { getBookmarks } from '../../state/bookmark/bookmark.selector';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [
    CommonModule,
    BookmarkCardComponent,
    CardComponent,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css',
})
export class BookmarkComponent implements OnInit {
  bookmarks$?: Observable<IBookmark[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadBookmarks());
    this.bookmarks$ = this.store.select(getBookmarks);
  }
}
