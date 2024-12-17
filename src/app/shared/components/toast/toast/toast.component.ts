import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' = 'success';
  @Output() hide = new EventEmitter<void>();

  visible = false;

  ngOnInit() {
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
      this.hide.emit();
    }, 3000);
  }
}
