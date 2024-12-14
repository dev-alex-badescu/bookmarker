import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../controls/input/input.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [InputComponent, MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() title = 'Bookmarker';

  value: string = '';

  clearInput() {
    this.value = '';
  }

  search() {}
}
