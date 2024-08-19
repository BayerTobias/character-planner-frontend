import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent {
  @Input() name: string = '';
  @Input() maxHealth: number = -1;
  @Input() level: number = -1;
}
