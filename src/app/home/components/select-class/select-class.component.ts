import { Component, inject } from '@angular/core';
import { CharacterDataService } from '../../../shared/services/character-data.service';

@Component({
  selector: 'app-select-class',
  standalone: true,
  imports: [],
  templateUrl: './select-class.component.html',
  styleUrl: './select-class.component.scss',
})
export class SelectClassComponent {
  public characterDataService = inject(CharacterDataService);
}
