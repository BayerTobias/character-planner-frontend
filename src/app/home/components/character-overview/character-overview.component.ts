import { Component, inject } from '@angular/core';
import { CharacterDataService } from '../../../shared/services/character-data.service';
import { BaseCharacter } from '../../models/base-character.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Mage } from '../../models/mage-character.model';

@Component({
  selector: 'app-character-overview',
  standalone: true,
  imports: [],
  templateUrl: './character-overview.component.html',
  styleUrl: './character-overview.component.scss',
})
export class CharacterOverviewComponent {
  public characterDataService = inject(CharacterDataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public character?: BaseCharacter;

  private characterId: number = -1;

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.characterId = +params['character_id'];
    });
    await this.characterDataService.getCharacterData(this.characterId);
  }

  isCaster(): boolean {
    return this.characterDataService.character instanceof Mage;
  }
}
