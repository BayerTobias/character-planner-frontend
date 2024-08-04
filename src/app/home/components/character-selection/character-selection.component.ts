import { Component, inject } from '@angular/core';
import { CharacterDataService } from '../../../shared/services/character-data.service';

@Component({
  selector: 'app-character-selection',
  standalone: true,
  imports: [],
  templateUrl: './character-selection.component.html',
  styleUrl: './character-selection.component.scss',
})
export class CharacterSelectionComponent {
  public characterDataService = inject(CharacterDataService);

  ngOnInit() {
    this.characterDataService.getCharacterList();
  }
}
