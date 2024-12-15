import { Component, Input, input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { IBookmark } from '../../../models/IBookmark.model';
import { GridListComponent } from '../grid-list/grid-list.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DateCategoryPipe } from '../../../pipes/date-category/date-category.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bookmark-card',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    MatGridListModule,
    GridListComponent,
    MatIconModule,
    DateCategoryPipe,
    RouterLink,
  ],
  templateUrl: './bookmark-card.component.html',
  styleUrl: './bookmark-card.component.css',
})
export class BookmarkCardComponent implements OnInit {
  @Input() bookmark?: IBookmark;

  ngOnInit(): void {}
}
