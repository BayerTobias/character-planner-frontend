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

  public selectScreen: boolean = false;
  public characterDetailsScreen: boolean = true;

  public selectedClass: CharClassListItem | null = null;
  public selectedRace: CharRace | null = null;

  public developmentPoints: number = 35;
  public spendPoints: number = 0;
  public attributeCosts = [
    { cost: 0, value: 0, bonus: -99 },
    { cost: 1, value: 1, bonus: -3 },
    { cost: 2, value: 2, bonus: -2 },
    { cost: 3, value: 3, bonus: -1 },
    { cost: 4, value: 4, bonus: -1 },
    { cost: 5, value: 5, bonus: 0 },
    { cost: 6, value: 6, bonus: 1 },
    { cost: 8, value: 7, bonus: 1 },
    { cost: 10, value: 8, bonus: 2 },
    { cost: 12, value: 9, bonus: 2 },
    { cost: 16, value: 10, bonus: 3 },
  ];

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
      strengthValue: [5, Validators.required],
      agilityValue: [5, Validators.required],
      constitutionValue: [5, Validators.required],
      intelligenceValue: [5, Validators.required],
      charismaValue: [5, Validators.required],
    });
  }

  ngOnInit() {
    this.calculateDevelopmentPoints();
  }

  calculateDevelopmentPoints() {
    this.spendPoints = 0;

    Object.keys(this.createCharacterForm.controls).forEach((key) => {
      const attributeValue = this.createCharacterForm.get(key)?.value;
      const costEntry = this.attributeCosts.find(
        (entry) => entry.value === attributeValue
      );

      if (costEntry) {
        this.spendPoints += costEntry.cost;
        this.calculateBonusValue(attributeValue);
      }
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
