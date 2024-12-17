import { Component, OnInit } from '@angular/core';
import {
  FormControl,
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
import { IBookmark } from '../../../models/IBookmark.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { InputComponent } from '../../../shared/controls/input/input.component';
import { BookmarkStateService } from '../../../state/services/bookmark-state/bookmark-state.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner/spinner.component';
import { Observable } from 'rxjs';
import { urlValidator } from '../../../shared/validators/url.validator';

@Component({
  selector: 'app-add-bookmark',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HeaderComponent,
    MatIconModule,
    MatDividerModule,
    InputComponent,
    SpinnerComponent,
  ],
  templateUrl: './add-bookmark.component.html',
  styleUrl: './add-bookmark.component.css',
})
export class AddBookmarkComponent implements OnInit {
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
  }

  onSubmit() {
    if (this.form.valid) {
      const date = new Date();
      date.setDate(date.getDate());

      const bookmark: IBookmark = {
        name: this.nameFormControl.value as string,
        url: this.urlFormControl.value as string,
        createdAt: date,
        updatedAt: date,
      };

      this.bookmarkStateService.dispatchCreateBookmark(bookmark);
    } else {
      console.log('Form is invalid');
    }
  }
}
