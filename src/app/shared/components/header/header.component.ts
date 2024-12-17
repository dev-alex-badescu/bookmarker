import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../controls/input/input.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [InputComponent, MatToolbarModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor() {}
  @Input() title = 'Bookmarker';

  search() {}
}
