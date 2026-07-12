import { Component, inject, Input, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseCharacter } from '../../../models/base-character.model';
import { CharacterDataService } from '../../../../shared/services/character-data.service';
import { GameDataService } from '../../../../shared/services/game-data.service';

@Component({
  selector: 'app-equipment-selector',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './equipment-selector.component.html',
  styleUrl: './equipment-selector.component.scss',
})
export class EquipmentSelectorComponent {
  public gameDataService = inject(GameDataService);
  public characterDataService = inject(CharacterDataService);

  @Input() character: BaseCharacter | null = null;

  onArmorSelected(event: Event) {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    const armor = this.gameDataService.baseArmors.find(
      (armor) => armor.id === selectedId,
    );

    if (armor) {
      this.characterDataService
        .updateAndSaveCharacter((character) => {
          character.equipArmor(armor);
        })
        ?.subscribe({
          next: (resp) => {
            console.log('Character updated and saved:', resp);
          },
          error: (err) => {
            console.error('Error updating character:', err);
          },
        });
    }
  }

  onShieldSelected(event: Event) {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    const shield = this.gameDataService.baseArmors.find(
      (shield) => shield.id === selectedId,
    );
    if (shield) {
      this.characterDataService
        .updateAndSaveCharacter((character) => {
          character.equipShield(shield);
        })
        ?.subscribe({
          next: (resp) => {
            console.log('Character updated and saved:', resp);
          },
          error: (err) => {
            console.error('Error updating character:', err);
          },
        });
    }
  }
}
