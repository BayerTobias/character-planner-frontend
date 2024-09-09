import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-with-error-msg',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input-with-error-msg.component.html',
  styleUrl: './input-with-error-msg.component.scss',
})
export class InputWithErrorMsgComponent {
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() errorMsg: string = 'Error';
  @Input() error: boolean = false;
}
