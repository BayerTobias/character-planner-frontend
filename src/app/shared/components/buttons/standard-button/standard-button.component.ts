import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-standard-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standard-button.component.html',
  styleUrl: './standard-button.component.scss',
})
export class StandardButtonComponent {
  @Input() content: string = '';
  @Input() imgUrl: string | null = null;
  @Input() width: string | null = null;
  @Input() height: string | null = null;
  @Input() borderRadius: string | null = null;
  @Input() fontWeight: number | null = null;
  @Input() fontSize: number | null = null;
  @Input() style: string = 'white';
  @Input() type: string = 'button';

  @HostBinding('style.width') hostWidth: string | null = null;

  @Output() submitEvent = new EventEmitter<void>();

  /**
   * Emits an event when the button is clicked.
   */
  submit() {
    this.submitEvent.emit();
  }

  ngOnChanges() {
    if (
      this.width &&
      typeof this.width === 'string' &&
      this.width.includes('%')
    ) {
      this.hostWidth = this.width;
    } else {
      this.hostWidth = null;
    }
  }
}
