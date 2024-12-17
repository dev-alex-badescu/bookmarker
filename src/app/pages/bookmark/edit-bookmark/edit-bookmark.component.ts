import { Component, Input, OnInit } from '@angular/core';
import { IBookmark } from '../../../models/IBookmark.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { InputComponent } from '../../../shared/controls/input/input.component';
import { BookmarkStateService } from '../../../state/services/bookmark-state/bookmark-state.service';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner/spinner.component';
import { urlValidator } from '../../../shared/validators/url.validator';

@Component({
  selector: 'app-edit-bookmark',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HeaderComponent,
    MatIconModule,
    MatDividerModule,
    InputComponent,
    SpinnerComponent,
  ],
  templateUrl: './edit-bookmark.component.html',
  styleUrl: './edit-bookmark.component.css',
})
export class EditBookmarkComponent implements OnInit {
  @Input() bookmark?: IBookmark | null;

  bookmarkLoading$?: Observable<boolean>;

  nameFormControl = new FormControl('', Validators.required);
  urlFormControl = new FormControl('', [Validators.required, urlValidator()]);

  form = new FormGroup({
    nameFormControl: this.nameFormControl,
    urlFormControl: this.urlFormControl,
  });

  constructor(private bookmarkStateService: BookmarkStateService) {}

  ngOnInit(): void {
    this.bookmarkLoading$ = this.bookmarkStateService.getBookmarkLoading();
    //TODO: DISTORY THIS
    this.bookmarkStateService.getBookmarkById().subscribe((bookmark) => {
      this.nameFormControl.setValue(bookmark?.name ?? '');
      this.urlFormControl.setValue(bookmark?.url ?? '');
      this.bookmark = bookmark;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const date = new Date();
      const dateString = date.toISOString().split('T')[0];

      const updatedAt = dateString;

      const bookmark = {
        ...this.bookmark,
        updatedAt,
        createdAt: this.bookmark?.createdAt || '',
        name: this.nameFormControl.value || '',
        url: this.urlFormControl.value || '',
      };

      this.bookmarkStateService.dispatchUpdateBookmark(bookmark);
    } else {
      console.log('Form is invalid');
    }
  }
}
