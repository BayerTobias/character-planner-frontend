import { Component, inject } from '@angular/core';
import { CharacterDataService } from '../../../shared/services/character-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-selection',
  standalone: true,
  imports: [],
  templateUrl: './character-selection.component.html',
  styleUrl: './character-selection.component.scss',
})
export class CharacterSelectionComponent {
  public characterDataService = inject(CharacterDataService);
  private router = inject(Router);

  ngOnInit() {
    this.characterDataService.getCharacterList();
  }

  routeCharacterCreater() {
    this.router.navigateByUrl('/create-character');
  }

  selectCharacter(id: number) {
    this.router.navigate(['/character'], { queryParams: { character_id: id } });
  }
}
