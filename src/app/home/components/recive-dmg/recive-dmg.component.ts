import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterDataService } from '../../../shared/services/character-data.service';

@Component({
  selector: 'app-recive-dmg',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recive-dmg.component.html',
  styleUrl: './recive-dmg.component.scss',
})
export class ReciveDmgComponent {
  private characterService = inject(CharacterDataService);
  public dmg: number = 0;

  @Output() submitEvent = new EventEmitter();

  async submitForm() {
    const character = this.characterService.character();

    if (character) {
      this.characterService.updateCharacter({
        currentHp: character.currentHp - this.dmg,
      });

      await this.characterService.uploadCharacter(character);

      this.submitEvent.emit();
    }
  }
}
