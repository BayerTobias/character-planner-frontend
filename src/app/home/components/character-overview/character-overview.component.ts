import { Component, inject } from '@angular/core';
import { CharacterDataService } from '../../../shared/services/character-data.service';
import { BaseCharacter } from '../../models/base-character.model';

@Component({
  selector: 'app-character-overview',
  standalone: true,
  imports: [],
  templateUrl: './character-overview.component.html',
  styleUrl: './character-overview.component.scss',
})
export class CharacterOverviewComponent {
  private characterDataService = inject(CharacterDataService);

  public character?: BaseCharacter;

  async getCharacterData() {
    await this.characterDataService.getCharacterData(1);

    // const characterData: any =
    //   await this.characterDataService.getCharacterData();
    // console.log(characterData);
    // this.character = new BaseCharacter(characterData);
    // console.log(this.character);
  }
}
