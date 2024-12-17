import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { BookmarkStateService } from '../../state/services/bookmark-state/bookmark-state.service';
import { ToastComponent } from '../../shared/components/toast/toast/toast.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, BookmarkComponent, ToastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private bookmarkStateService: BookmarkStateService) {}

  ngOnInit(): void {
    this.bookmarkStateService.dispatchLoadBookmarks();
  }
}
