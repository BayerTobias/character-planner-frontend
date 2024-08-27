import { Component, inject } from '@angular/core';
import { GameDataService } from '../../../shared/services/game-data.service';
import { CharClassListItem } from '../../models/char-class-list-item.mode';
import { CharRace } from '../../models/char-race.model';
import { Mage } from '../../models/mage-character.model';
import { CharClass } from '../../models/char-class.model';
import { CharacterDataService } from '../../../shared/services/character-data.service';

@Component({
  selector: 'app-character-creator',
  standalone: true,
  imports: [],
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.scss',
})
export class CharacterCreatorComponent {
  public gameDataService = inject(GameDataService);
  public characterDataService = inject(CharacterDataService);

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

  async next() {
    if (this.selectedClass && this.selectedClass.id && this.selectedRace) {
      this.selectScreen = false;
      this.characterDetailsScreen = true;
      this.character = new Mage();
      this.character.class = await this.characterDataService.getClassDetails(
        this.selectedClass.id
      );

      console.log(this.character);
    }
  }

  async createCharacter() {
    console.log(this.character);
  }
}
