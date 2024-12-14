import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IBookmark } from '../../models/IBookmark.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  bookmarks$?: Observable<IBookmark[]>;

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarks$ = this.bookmarkService.getAllBookmarks();
  }
}
