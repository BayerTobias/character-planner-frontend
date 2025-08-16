import { Component, inject } from '@angular/core';
import { GameDataService } from '../../../shared/services/game-data.service';
import { CharClassListItem } from '../../models/char-class-list-item.mode';
import { CharRace } from '../../models/char-race.model';
import { Mage } from '../../models/mage-character.model';
import { CharacterDataService } from '../../../shared/services/character-data.service';
import { Router } from '@angular/router';
import { BaseCharacter } from '../../models/base-character.model';
import { SelectClassComponent } from './select-class/select-class.component';
import { SelectRaceComponent } from './select-race/select-race.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharDetails } from '../../models/char-dedails.model';
import { CharacterFactory } from '../../factories/character-factory';

@Component({
  selector: 'app-character-creator',
  standalone: true,
  imports: [
    SelectClassComponent,
    SelectRaceComponent,
    CharacterDetailsComponent,
  ],
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.scss',
})
export class CharacterCreatorComponent {
  public gameDataService = inject(GameDataService);
  public characterDataService = inject(CharacterDataService);
  private router = inject(Router);

  public character: BaseCharacter | Mage = new BaseCharacter();

  public selectClassScreen: boolean = false;
  public selectRaceScreen: boolean = false;
  public characterDetailsScreen: boolean = true;

  public selectedClass: CharClassListItem | null = null;
  public selectedRace: CharRace | null = null;
  public characterDetails: CharDetails = new CharDetails();

  goToStep(step: string) {
    this.selectClassScreen = step === 'class';
    this.selectRaceScreen = step === 'race';
    this.characterDetailsScreen = step === 'details';
  }

  onClassSelected(selectedClass: CharClassListItem) {
    this.selectedClass = selectedClass;
    this.goToStep('race');
  }

  onRaceSelected(selectedRace: CharRace) {
    this.selectedRace = selectedRace;
    this.goToStep('details');

    console.log(this.selectedClass);
    console.log(this.selectedRace);
  }

  selectClass(charClass: CharClassListItem) {
    this.selectedClass = charClass;
    console.log(this.selectedClass);
  }

  selectRace(race: CharRace) {
    this.selectedRace = race;
    console.log(this.selectedRace);
  }

  async createCharacter($event: CharDetails) {
    this.characterDetails = $event;

    if (this.canCreateCharacter()) {
      try {
        await this.prepareCharacter();

        const resp = await this.characterDataService.uploadCharacter(
          this.character
        );
        console.log(resp);
        this.router.navigateByUrl(
          `character?character_id=${resp.character.id}`
        );
      } catch (err) {
        console.error(err);
      }
    }
  }

  canCreateCharacter() {
    return (
      this.selectedClass &&
      this.selectedClass.id &&
      this.selectedRace &&
      this.characterDetails
    );
  }

  async prepareCharacter() {
    this.character = CharacterFactory.create(
      undefined,
      this.selectedClass?.name || 'default'
    );
    this.character.race = this.selectedRace!;
    this.character.class = await this.characterDataService.getClassDetails(
      this.selectedClass!.id!
    );
    this.fillCharacterStats();
    this.character.maxHealth = this.character.calculateMaxHealth();
    this.character.currentHp = this.character.maxHealth;
  }

  fillCharacterStats() {
    if (this.character) {
      this.character.name = this.characterDetails.name;
      this.character.strengthValue = this.characterDetails.strengthValue;
      this.character.strengthBonus = this.characterDetails.strengthBonus;
      this.character.agilityValue = this.characterDetails.agilityValue;
      this.character.agilityBonus = this.characterDetails.agilityBonus;
      this.character.constitutionValue =
        this.characterDetails.constitutionValue;
      this.character.constitutionBonus =
        this.characterDetails.constitutionBonus;
      this.character.intelligenceValue =
        this.characterDetails.intelligenceValue;
      this.character.intelligenceBonus =
        this.characterDetails.intelligenceBonus;
      this.character.charismaValue = this.characterDetails.charismaValue;
      this.character.charismaBonus = this.characterDetails.charismaBonus;
    }
  }
}
