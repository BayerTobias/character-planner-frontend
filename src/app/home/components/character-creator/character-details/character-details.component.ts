import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputWithErrorMsgComponent } from '../../../../shared/components/form-components/input-with-error-msg/input-with-error-msg.component';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { CharDetails } from '../../../models/char-dedails.model';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputWithErrorMsgComponent,
    NavigationComponent,
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent {
  private fb = inject(FormBuilder);

  public developmentPoints: number = 35;
  public spendPoints: number = 0;

  public createCharacterForm: FormGroup;
  private characterDetails: CharDetails = new CharDetails();

  @Output() characterDetailsEvent = new EventEmitter<CharDetails>();

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

  getFormControl(controlName: string) {
    return this.createCharacterForm.get(controlName) as FormControl;
  }

  submitCharacterDetails() {
    if (this.createCharacterForm.valid) {
      this.characterDetails.name = this.getFormValue('characterName');
      this.characterDetails.strengthValue = this.getFormValue('strengthValue');
      this.characterDetails.strengthBonus = this.statBonuses['strengthBonus'];
      this.characterDetails.agilityValue = this.getFormValue('agilityValue');
      this.characterDetails.agilityBonus = this.statBonuses['agilityBonus'];
      this.characterDetails.constitutionValue =
        this.getFormValue('constitutionValue');
      this.characterDetails.constitutionBonus =
        this.statBonuses['constitutionBonus'];
      this.characterDetails.intelligenceValue =
        this.getFormValue('intelligenceValue');
      this.characterDetails.intelligenceBonus =
        this.statBonuses['intelligenceBonus'];
      this.characterDetails.charismaValue = this.getFormValue('charismaValue');
      this.characterDetails.charismaBonus = this.statBonuses['charismaBonus'];

      this.characterDetailsEvent.emit(this.characterDetails);
    } else console.error('ERROR');
  }

  getFormValue(value: string) {
    return this.createCharacterForm.get(value)?.value;
  }
}
