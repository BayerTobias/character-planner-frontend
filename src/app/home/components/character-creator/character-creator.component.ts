import { Component, inject } from '@angular/core';
import { GameDataService } from '../../../shared/services/game-data.service';
import { CharClassListItem } from '../../models/char-class-list-item.mode';
import { CharRace } from '../../models/char-race.model';
import { Mage } from '../../models/mage-character.model';
import { CharClass } from '../../models/char-class.model';

@Component({
  selector: 'app-character-creator',
  standalone: true,
  imports: [],
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.scss',
})
export class CharacterCreatorComponent {
  public gameDataService = inject(GameDataService);

  character: Mage | null = null;

  selectScreen: boolean = true;
  characterDetailsScreen: boolean = false;

  selectedClass: CharClassListItem | null = null;
  selectedRace: CharRace | null = null;

  selectClass(charClass: CharClassListItem) {
    this.selectedClass = charClass;
    console.log(this.selectedClass);
  }

  selectRace(race: CharRace) {
    this.selectedRace = race;
    console.log(this.selectedRace);
  }

  next() {
    if (this.selectedClass && this.selectedRace) {
      this.selectScreen = false;
      this.characterDetailsScreen = true;
      //Setup char based on class
      this.character = new Mage();

      console.log(this.character);
    }
  }
}
