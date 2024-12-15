import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookmarkCardComponent } from '../../shared/components/bookmark-card/bookmark-card.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { IBookmark } from '../../models/IBookmark.model';
import { Observable } from 'rxjs';
import { BookmarkService } from '../../services/bookmark/bookmark.service';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [CommonModule, BookmarkCardComponent, CardComponent],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css',
})
export class BookmarkComponent implements OnInit {
  bookmarks$?: Observable<IBookmark[]>;

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarks$ = this.bookmarkService.getAllBookmarks();
  }
}
