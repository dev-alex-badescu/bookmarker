import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BookmarkState } from '../../../state/shared/models/bookmark-state.model';
import { Store } from '@ngrx/store';
import { createBookmark } from '../../../state/bookmark/bookmark.actions';
import { IBookmark } from '../../../models/IBookmark.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-add-bookmark',
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
  templateUrl: './add-bookmark.component.html',
  styleUrl: './add-bookmark.component.css',
})
export class AddBookmarkComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<BookmarkState>
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      resourceLink: ['', Validators.required],
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

      this.store.dispatch(createBookmark({ bookmark }));
    } else {
      console.log('Form is invalid');
    }
  }
  ngOnInit(): void {}
}
