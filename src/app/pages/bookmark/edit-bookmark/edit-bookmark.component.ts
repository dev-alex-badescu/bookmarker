import { Component, Input, OnInit } from '@angular/core';
import { IBookmark } from '../../../models/IBookmark.model';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Store } from '@ngrx/store';
import { BookmarkState } from '../../../state/shared/models/bookmark-state.model';
import { getBookmarkById } from '../../../state/bookmark/bookmark.selector';
import { updateBookmark } from '../../../state/bookmark/bookmark.actions';

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
  ],
  templateUrl: './edit-bookmark.component.html',
  styleUrl: './edit-bookmark.component.css',
})
export class EditBookmarkComponent implements OnInit {
  @Input() bookmark?: IBookmark | null;

  form: FormGroup;

  constructor(
    private store: Store<BookmarkState>,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      resourceLink: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.select(getBookmarkById()).subscribe((bookmark) => {
      console.log('bookmark-->', bookmark);

      this.form.get('name')?.setValue(bookmark?.name),
        this.form.get('resourceLink')?.setValue(bookmark?.url),
        (this.bookmark = bookmark);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const date = new Date();
      const dateString = date.toISOString().split('T')[0];

      const bookmark: IBookmark = {
        name: this.form.get('name')?.value as string,
        url: this.form.get('resourceLink')?.value as string,
        createdAt: dateString,
        updatedAt: dateString,
      };

      this.store.dispatch(updateBookmark({ bookmark }));
    } else {
      console.log('Form is invalid');
    }
  }
}
