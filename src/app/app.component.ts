import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ToastService } from './shared/services/toast/toast.service';
import { ToastComponent } from './shared/components/toast/toast/toast.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './shared/components/spinner/spinner/spinner.component';
import { InputComponent } from './shared/controls/input/input.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    ToastComponent,
    SpinnerComponent,
    InputComponent,
  ],
})
export class AppComponent {
  title = 'Bookmarker';

  constructor(public toastService: ToastService) {}
}
