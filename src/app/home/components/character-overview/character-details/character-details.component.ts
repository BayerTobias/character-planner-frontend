import { Component, Input } from '@angular/core';
import { ClassTranslatePipe } from '../../../../shared/pipes/class-translate.pipe';
import { CommonModule } from '@angular/common';
import { CharRace } from '../../../models/char-race.model';
import { CharClass } from '../../../models/char-class.model';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [ClassTranslatePipe, CommonModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent {
  @Input() name: string = '';
  @Input() characterRace: CharRace | null = null;
  @Input() characterClass: CharClass | null = null;
  @Input() currentHealth: number = -1;
  @Input() maxHealth: number = -1;
  @Input() currentMana: number | null = null;
  @Input() maxMana: number | null = null;
  @Input() level: number = -1;
}
