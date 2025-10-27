import { Component } from '@angular/core';
import { StandardButtonComponent } from '../../../../shared/components/buttons/standard-button/standard-button.component';

@Component({
  selector: 'app-character-controls',
  standalone: true,
  imports: [StandardButtonComponent],
  templateUrl: './character-controls.component.html',
  styleUrl: './character-controls.component.scss',
})
export class CharacterControlsComponent {}
