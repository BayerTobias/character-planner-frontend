import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CharacterDataService } from '../../../shared/services/character-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hourly-rest-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hourly-rest.component.html',
  styleUrl: './hourly-rest.component.scss',
})
export class HourlyRestComponentComponent {
  public characterService = inject(CharacterDataService);
  public hours: number = 0;
  public displayMana: number | null = 0;

  @Output() submitEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.log(this.characterService.character()?.class.mainStat);
    console.log(this.calculateManaRegen());
    const character = this.characterService.character();

    if (character) {
      this.displayMana = character.currentMana;
    }
  }

  submitForm() {}

  calculateManaRegen() {
    const character = this.characterService.character();
    if (character && this.displayMana && character.currentMana) {
      const mainStat = character.class.mainStat;

      switch (mainStat) {
        case 'intelligence':
          console.log('int');

          this.displayMana = this.calc(
            character.currentMana,
            character.intelligenceBonus
          );
          console.log(this.displayMana);
          break;

        case 'charisma':
          this.displayMana =
            this.displayMana + (character.intelligenceBonus + 1) * 3;
          break;
        default:
          break;
      }
    }
  }

  calc(currentMana: number, bonus: number) {
    return currentMana + (bonus + 1) * this.hours;
  }
}
