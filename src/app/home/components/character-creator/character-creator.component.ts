import { Component, inject } from '@angular/core';
import { GameDataService } from '../../../shared/services/game-data.service';
import { CharClassListItem } from '../../models/char-class-list-item.mode';

@Component({
  selector: 'app-character-creator',
  standalone: true,
  imports: [],
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.scss',
})
export class CharacterCreatorComponent {
  public gameDataService = inject(GameDataService);

  selectedClass: CharClassListItem | null = null;

  selectClass(charClass: CharClassListItem) {
    console.log(charClass);
  }

  selectRace() {
    console.log('test');
  }
}
