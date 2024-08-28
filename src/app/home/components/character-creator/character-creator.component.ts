import { Component, inject } from '@angular/core';
import { GameDataService } from '../../../shared/services/game-data.service';
import { CharClassListItem } from '../../models/char-class-list-item.mode';
import { CharRace } from '../../models/char-race.model';
import { Mage } from '../../models/mage-character.model';
import { CharacterDataService } from '../../../shared/services/character-data.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-character-creator',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.scss',
})
export class CharacterCreatorComponent {
  public gameDataService = inject(GameDataService);
  public characterDataService = inject(CharacterDataService);
  private fb = inject(FormBuilder);

  public createCharacterForm: FormGroup;

  private character: Mage | null = null;

  public selectScreen: boolean = true;
  public characterDetailsScreen: boolean = false;

  public selectedClass: CharClassListItem | null = null;
  public selectedRace: CharRace | null = null;

  private developmentPoints: number = 35;
  public statBonuses: { [key: string]: number } = {
    strengthBonus: 0,
    agilityBonus: 0,
    constitutionBonus: 0,
    intelligenceBonus: 0,
    charismaBonus: 0,
  };

  constructor() {
    this.createCharacterForm = this.fb.group({
      characterName: ['', Validators.required],
      strengthValue: [1, Validators.required],
      agilityValue: [1, Validators.required],
      constitutionValue: [1, Validators.required],
      intelligenceValue: [1, Validators.required],
      charismaValue: [1, Validators.required],
    });
  }

  selectClass(charClass: CharClassListItem) {
    this.selectedClass = charClass;
    console.log(this.selectedClass);
  }

  selectRace(race: CharRace) {
    this.selectedRace = race;
    console.log(this.selectedRace);
  }

  async next() {
    if (this.selectedClass && this.selectedClass.id && this.selectedRace) {
      this.selectScreen = false;
      this.characterDetailsScreen = true;
      this.character = new Mage();
      this.character.class = await this.characterDataService.getClassDetails(
        this.selectedClass.id
      );

      console.log(this.character);
    }
  }

  calculateBonusValue(statName: string) {
    const statValue =
      this.createCharacterForm.get(statName + 'Value')?.value || 1;
    console.log(statValue);

    let bonus = 0;

    switch (statValue) {
      case 0:
        bonus = -4;
        break;
      case 1:
        bonus = -3;
        break;
      case 2:
        bonus = -2;
        break;
      case 3:
      case 4:
        bonus = -1;
        break;
      case 5:
        bonus = 0;
        break;
      case 6:
      case 7:
        bonus = 1;
        break;
      case 8:
      case 9:
        bonus = 2;
        break;
      case 10:
      case 11:
        bonus = 3;
        break;
      case 12:
      case 13:
        bonus = 4;
        break;
      case 14:
        bonus = 5;
        break;
      default:
        bonus = 0;
        break;
    }

    this.statBonuses[`${statName}Bonus`] = bonus;
    console.log(this.statBonuses);
  }

  async createCharacter() {
    if (this.createCharacterForm.valid && this.character) {
      this.character.name =
        this.createCharacterForm.get('characterName')?.value;
    }

    console.log(this.character);
  }
}
