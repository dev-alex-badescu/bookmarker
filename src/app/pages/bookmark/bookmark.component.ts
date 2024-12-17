import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BookmarkCardComponent } from '../../shared/components/bookmark-card/bookmark-card.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { IBookmark } from '../../models/IBookmark.model';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BookmarkStateService } from '../../state/services/bookmark-state/bookmark-state.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner/spinner.component';
import { TimeRangeFilter } from '../../shared/consts/timeRangeFilter.const';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [
    CommonModule,
    BookmarkCardComponent,
    CardComponent,
    RouterLink,
    HeaderComponent,
    SpinnerComponent,
  ],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css',
})
export class BookmarkComponent implements OnInit {
  todayBookmarks$?: Observable<IBookmark[]>;
  yesterdayBookmarks$?: Observable<IBookmark[]>;
  olderBookmarks$?: Observable<IBookmark[]>;
  bookmarkLoading$?: Observable<boolean>;

  constructor(private bookmarkStateService: BookmarkStateService) {}

  ngOnInit(): void {
    this.bookmarkLoading$ = this.bookmarkStateService.getBookmarkLoading();
    this.todayBookmarks$ = this.bookmarkStateService.getBookmarks(
      TimeRangeFilter.Today
    );

    this.yesterdayBookmarks$ = this.bookmarkStateService.getBookmarks(
      TimeRangeFilter.Yesterday
    );

    this.olderBookmarks$ = this.bookmarkStateService.getBookmarks(
      TimeRangeFilter.Older
    );
  }
}
