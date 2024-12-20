import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { BookmarkStateService } from '../../state/services/bookmark-state/bookmark-state.service';
import { ToastComponent } from '../../shared/components/toast/toast/toast.component';
import { InputComponent } from '../../shared/controls/input/input.component';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { IBookmark } from '../../models/IBookmark.model';
import { BookmarkCardComponent } from '../../shared/components/bookmark-card/bookmark-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    BookmarkComponent,
    ToastComponent,
    InputComponent,
    BookmarkCardComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private destroy$ = new Subject<void>();

  filteredBookmarks$: Observable<IBookmark[]> | undefined;
  searchFormControl = new FormControl('');

  constructor(private bookmarkStateService: BookmarkStateService) {}

  ngOnInit(): void {
    this.bookmarkStateService.dispatchLoadBookmarks();

    this.bookmarkStateService
      .getCurrentRoute()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.searchFormControl.setValue('');
      });

    this.setupSearch();
  }

  private setupSearch() {
    this.filteredBookmarks$ = this.searchFormControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText) =>
        this.bookmarkStateService.getFilterBookmarksByName(searchText ?? '')
      )
    );
  }

  ngOnDestroy() {
    this.distroy();
  }

  private distroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
