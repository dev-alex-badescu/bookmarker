import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BookmarkComponent } from '../bookmark/bookmark.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, BookmarkComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
