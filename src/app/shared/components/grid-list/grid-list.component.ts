import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { IGridListItem } from '../../models/IGridListItem.model';

@Component({
  selector: 'app-grid-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './grid-list.component.html',
  styleUrl: './grid-list.component.css',
})
export class GridListComponent {
  @Input() gridList: IGridListItem[] = [];
  @Input() columnsLength: number = 0;
  @Input() rowHeight: number = 0;
}
