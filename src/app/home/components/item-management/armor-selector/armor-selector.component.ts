import { Component, inject } from '@angular/core';
import { CharacterDataService } from '../../../../shared/services/character-data.service';
import { GameDataService } from '../../../../shared/services/game-data.service';
import { BaseArmor } from '../../../models/base-armor.model';

@Component({
  selector: 'app-armor-selector',
  standalone: true,
  imports: [],
  templateUrl: './armor-selector.component.html',
  styleUrl: './armor-selector.component.scss',
})
export class ArmorSelectorComponent {
  public characterDataService = inject(CharacterDataService);
  public gameDataService = inject(GameDataService);

  public focusedArmorIndex: number = 0;
  public selectArmorOpen: boolean = false;

  toggleArmorSelection() {
    this.selectArmorOpen = !this.selectArmorOpen;
  }

  async handleKeydown(event: KeyboardEvent) {
    const maxIndex = this.gameDataService.baseArmors.length - 1;

    switch (event.key) {
      case 'ArrowDown':
        if (this.focusedArmorIndex < maxIndex) this.focusedArmorIndex++;
        else this.focusedArmorIndex = 0;
        event.preventDefault();
        console.log(this.focusedArmorIndex);
        break;

      case 'ArrowUp':
        if (this.focusedArmorIndex > 0) this.focusedArmorIndex--;
        else this.focusedArmorIndex = maxIndex;
        event.preventDefault();
        console.log(this.focusedArmorIndex);
        break;

      case 'Enter':
        if (this.selectArmorOpen) {
          const armor = this.gameDataService.baseArmors[this.focusedArmorIndex];
          await this.selectArmor(armor);
          event.preventDefault();
        }
        break;

      case 'Escape':
        if (this.selectArmorOpen) {
          this.selectArmorOpen = false;
          event.preventDefault();
        }
        break;
    }
  }

  async selectArmor(armor: BaseArmor) {
    const character = this.characterDataService.character;

    if (!character) {
      return;
    }

    character.armor = armor;

    try {
      const resp = await this.characterDataService.uploadCharacter(character);
      console.log(resp);
      this.selectArmorOpen = false;
    } catch (err) {
      console.error(err);
    }
  }
}
