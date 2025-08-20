import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';
import { CharDetails } from '../../../models/char-dedails.model';
import { ClassTranslatePipe } from '../../../../shared/pipes/class-translate.pipe';
import { StatDistributionRowComponent } from './stat-distribution-row/stat-distribution-row.component';
import { OverlayBaseComponent } from '../../overlay-base/overlay-base.component';
import { CharRace } from '../../../models/char-race.model';
import {
  ATTRIBUTE_COST,
  AttributeCosts,
  StatBonuses,
} from './character-details.constants';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavigationComponent,
    ClassTranslatePipe,
    StatDistributionRowComponent,
    OverlayBaseComponent,
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent {
  private fb = inject(FormBuilder);

  @Input() characterClass: string = '';
  @Input() characterRace: CharRace | null = null;

  public developmentPoints: number = 35;
  public spendPoints: number = 0;
  public developmentPointsLeft: number = 35;

  public createCharacterForm: FormGroup;
  private characterDetails: CharDetails = new CharDetails();

  public overlayOpen: boolean = false;

  @Output() characterDetailsEvent = new EventEmitter<CharDetails>();

  private attributeCosts: AttributeCosts[] = ATTRIBUTE_COST;

  public statBonuses: StatBonuses = {
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

    this.developmentPointsLeft = this.developmentPoints - this.spendPoints;
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

  increaseStat(statname: string) {
    const control = this.getFormControl(statname + 'Value');
    const currentValue = control.value;

    if (currentValue < 10) {
      control.patchValue(currentValue + 1);
      this.calculateDevelopmentPoints();
    }
  }

  decreaseStat(statname: string) {
    const control = this.getFormControl(statname + 'Value');
    const currentValue = control.value;

    if (currentValue > 0) {
      control.patchValue(currentValue - 1);
      this.calculateDevelopmentPoints();
    }
  }

  getFormControl(controlName: string) {
    return this.createCharacterForm.get(controlName) as FormControl;
  }

  submitCharacterDetails() {
    if (!this.createCharacterForm.valid) {
      console.error('ERROR');
      return;
    }

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
  }

  getFormValue(value: string) {
    return this.createCharacterForm.get(value)?.value;
  }

  get pointsOverLimit() {
    return Math.abs(this.developmentPointsLeft);
  }

  toggleInfoOverlay() {
    this.overlayOpen = !this.overlayOpen;
  }
}
