import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CharacterDataService } from '../../../shared/services/character-data.service';

@Component({
  selector: 'app-hourly-rest-component',
  standalone: true,
  imports: [],
  templateUrl: './hourly-rest-component.component.html',
  styleUrl: './hourly-rest-component.component.scss',
})
export class HourlyRestComponentComponent {
  public characterService = inject(CharacterDataService);

  @Output() submitEvent = new EventEmitter();

  ngOnInit() {
    console.log(this.characterService.character?.class.mainStat);
    console.log(this.calculateManaRegen());
  }

  submitForm() {}

  calculateManaRegen() {
    const character = this.characterService.character;

    if (!character) return null;

    const mainStat = character.class.mainStat;

    switch (mainStat) {
      case 'intelligence':
        return (character.intelligenceBonus + 1) * 3;
      case 'charisma':
        return (character.charismaBonus + 1) * 3;
      default:
        return 0;
    }
  }
}
