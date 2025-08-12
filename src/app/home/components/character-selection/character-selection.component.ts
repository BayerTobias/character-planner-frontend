import { Component, inject } from '@angular/core';
import { CharacterDataService } from '../../../shared/services/character-data.service';
import { Router } from '@angular/router';
import { NavigationComponent } from '../../../shared/components/navigation/navigation.component';
import { ClassTranslatePipe } from '../../../shared/pipes/class-translate.pipe';
import { BaseCharacter } from '../../models/base-character.model';
import { CharacterListItem } from '../../models/character-list-item.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-character-selection',
  standalone: true,
  imports: [NavigationComponent, ClassTranslatePipe],
  templateUrl: './character-selection.component.html',
  styleUrl: './character-selection.component.scss',
})
export class CharacterSelectionComponent {
  public characterDataService = inject(CharacterDataService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public selectedCharacter: CharacterListItem | null = null;

  ngOnInit() {
    this.characterDataService.getCharacterList();
  }

  async logout() {
    await this.authService.logout();
  }

  routeToCharacterOverview() {
    if (!this.selectedCharacter) return;

    this.router.navigate(['/character'], {
      queryParams: { character_id: this.selectedCharacter.id },
    });
  }

  routeCharacterCreater() {
    this.router.navigateByUrl('/create-character');
  }

  selectCharacter(character: CharacterListItem) {
    this.selectedCharacter = character;
    console.log(this.selectedCharacter);
  }
}
