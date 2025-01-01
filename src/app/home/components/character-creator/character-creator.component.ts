import { Component, inject } from '@angular/core';
import { GameDataService } from '../../../shared/services/game-data.service';
import { CharClassListItem } from '../../models/char-class-list-item.mode';
import { CharRace } from '../../models/char-race.model';
import { Mage } from '../../models/mage-character.model';
import { CharacterDataService } from '../../../shared/services/character-data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputWithErrorMsgComponent } from '../../../shared/components/form-components/input-with-error-msg/input-with-error-msg.component';
import { BaseCharacter } from '../../models/base-character.model';

@Component({
  selector: 'app-character-creator',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputWithErrorMsgComponent],
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.scss',
})
export class CharacterCreatorComponent {
  public gameDataService = inject(GameDataService);
  public characterDataService = inject(CharacterDataService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public createCharacterForm: FormGroup;

  private character: BaseCharacter | Mage = new BaseCharacter();

  public selectScreen: boolean = true;
  public characterDetailsScreen: boolean = false;

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
        this.calculateBonusValue(key, costEntry);
      }
    });
  }

  calculateBonusValue(
    statName: string,
    costEntry: {
      cost: number;
      value: number;
      bonus: number;
    }
  ) {
    switch (statName) {
      case 'strengthValue':
        this.statBonuses['strengthBonus'] = costEntry.bonus;
        break;
      case 'agilityValue':
        this.statBonuses['agilityBonus'] = costEntry.bonus;
        break;
      case 'constitutionValue':
        this.statBonuses['constitutionBonus'] = costEntry.bonus;
        break;
      case 'intelligenceValue':
        this.statBonuses['intelligenceBonus'] = costEntry.bonus;
        break;
      case 'charismaValue':
        this.statBonuses['charismaBonus'] = costEntry.bonus;
        break;
      default:
        break;
    }
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
      this.character = this.setCharacterObject();
      this.character.race = this.selectedRace;
      this.character.class = await this.characterDataService.getClassDetails(
        this.selectedClass.id
      );

      console.log(this.character);
    }
  }

  async createCharacter() {
    if (this.createCharacterForm.valid && this.character) {
      this.fillCharacterStats();
      this.character.maxHealth = this.character.calculateMaxHealth();
      this.character.currentHp = this.character.maxHealth;

      console.log(this.character);

      // try {
      //   const resp = await this.characterDataService.uploadCharacter(
      //     this.character
      //   );
      //   console.log(resp);
      //   this.router.navigateByUrl(`character?character_id=${resp.id}`);
      // } catch (err) {
      //   console.error(err);
      // }
    }
  }

  setCharacterObject() {
    switch (this.selectedClass?.name) {
      case 'mage':
        return new Mage();

      default:
        return new BaseCharacter();
    }
  }

  fillCharacterStats() {
    if (this.character) {
      this.character.name = this.getFormValue('characterName');
      this.character.strengthValue = this.getFormValue('strengthValue');
      this.character.strengthBonus = this.statBonuses['strengthBonus'];
      this.character.agilityValue = this.getFormValue('agilityValue');
      this.character.agilityBonus = this.statBonuses['agilityBonus'];
      this.character.constitutionValue = this.getFormValue('constitutionValue');
      this.character.constitutionBonus = this.statBonuses['constitutionBonus'];
      this.character.intelligenceValue = this.getFormValue('intelligenceValue');
      this.character.intelligenceBonus = this.statBonuses['intelligenceBonus'];
      this.character.charismaValue = this.getFormValue('charismaValue');
      this.character.charismaBonus = this.statBonuses['charismaBonus'];
    }
  }

  getFormValue(value: string) {
    return this.createCharacterForm.get(value)?.value;
  }

  getFormControl(controlName: string) {
    return this.createCharacterForm.get(controlName) as FormControl;
  }
}
