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

  @Input() character: BaseCharacter | null = null;
}
