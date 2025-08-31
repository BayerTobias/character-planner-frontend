import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ERROR_MESSAGES } from '../../../validators/error-messages';

@Component({
  selector: 'app-input-with-error-msg',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input-with-error-msg.component.html',
  styleUrl: './input-with-error-msg.component.scss',
})
export class InputWithErrorMsgComponent {
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
  @Input() label: string = 'input';

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched)
      return null;

    const firstErrorKey = Object.keys(this.control.errors)[0];
    const errorGenerator = ERROR_MESSAGES[firstErrorKey];

    if (errorGenerator) {
      return errorGenerator(this.label);
    }

    return '';
  }
}
