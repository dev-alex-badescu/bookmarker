import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookmarkCardComponent } from '../../shared/components/bookmark-card/bookmark-card.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { IBookmark } from '../../models/IBookmark.model';
import { Observable } from 'rxjs';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [CommonModule, BookmarkCardComponent, CardComponent, RouterLink],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css',
})
export class BookmarkComponent implements OnInit {
  bookmarks$?: Observable<IBookmark[]>;

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarks$ = this.bookmarkService.getAllBookmarks();

    console.log('trebiue sa intre aici');
  }
}
