import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GameDataService } from '../../../../shared/services/game-data.service';
import { CustomWeapon } from '../../../models/custom-weapon.model';
import { WeaponGroup } from '../../../models/weapon-group.model';
import { CommonModule } from '@angular/common';
import { CharacterDataService } from '../../../../shared/services/character-data.service';
import { CustomWeaponFactory } from '../../../factories/custom-weapon-factory';
import { BaseCharacter } from '../../../models/base-character.model';
import { InputWithErrorMsgComponent } from '../../../../shared/components/inputs/input-with-error-msg/input-with-error-msg.component';
import { NavigationComponent } from '../../../../shared/components/navigation/navigation.component';

@Component({
  selector: 'app-custom-weapon-creator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputWithErrorMsgComponent,
    NavigationComponent,
  ],
  templateUrl: './custom-weapon-creator.component.html',
  styleUrl: './custom-weapon-creator.component.scss',
})
export class CustomWeaponCreatorComponent {
  public customWeaponForm: FormGroup;

  private fb = inject(FormBuilder);
  public gameDataService = inject(GameDataService);
  private characterDataService = inject(CharacterDataService);

  public selectedWeaponGroups: WeaponGroup[] = [];

  @Input() customWeapon: CustomWeapon | null = null;

  @Output() closeOverlayEvent = new EventEmitter();

  constructor() {
    this.customWeaponForm = this.fb.group({
      name: ['', Validators.required],
      minStr: [null, Validators.required],
      dmg: [null, Validators.required],
      attribute: ['', Validators.required],
      weight: [null, Validators.required],
      iniBonus: [null, Validators.required],
      special: [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.customWeapon) {
      this.customWeaponForm.patchValue({
        name: this.customWeapon.name,
        minStr: this.customWeapon.minStr,
        dmg: this.customWeapon.dmg,
        attribute: this.customWeapon.attribute,
        weight: this.customWeapon.weight,
        iniBonus: this.customWeapon.iniBonus,
        special: this.customWeapon.special,
      });

      this.selectedWeaponGroups = this.customWeapon.weaponGroups;
    }
  }

  selectWeaponGroup(weaponGroup: WeaponGroup) {
    const index = this.selectedWeaponGroups.findIndex(
      (group) => group.id === weaponGroup.id
    );

    if (index > -1) {
      this.selectedWeaponGroups.splice(index, 1);
    } else {
      this.selectedWeaponGroups.push(weaponGroup);
    }
  }

  isSelected(weaponGroup: WeaponGroup) {
    return this.selectedWeaponGroups.some(
      (group) => group.id === weaponGroup.id
    );
  }

  async createOrUpdateWeapon() {
    const character = this.characterDataService.character;

    if (!character) {
      return;
    }

    if (this.customWeapon) {
      this.updateExistingweapon();
    } else {
      this.createNewWeapon(character);
    }

    await this.uploadCharacter(character);
  }

  updateExistingweapon() {
    if (!this.customWeapon) return;

    CustomWeaponFactory.updateWeapon(this.customWeapon, this.customWeaponForm);
    this.customWeapon.weaponGroups = this.selectedWeaponGroups;
  }

  createNewWeapon(character: BaseCharacter) {
    const newWeapon = CustomWeaponFactory.fromForm(this.customWeaponForm);
    newWeapon.weaponGroups = this.selectedWeaponGroups;
    character.customWeapons.push(newWeapon);
  }

  async deleteWeapon() {
    const character = this.characterDataService.character;

    if (!this.customWeapon || !character) return;

    const index = character.customWeapons.findIndex(
      (weapon) => weapon.id === this.customWeapon?.id
    );

    character.customWeapons.splice(index, 1);

    await this.uploadCharacter(character);
  }

  async uploadCharacter(character: BaseCharacter) {
    try {
      const resp = await this.characterDataService.uploadCharacter(character);
      this.emitCloseOverlay();
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  }

  emitCloseOverlay() {
    this.closeOverlayEvent.emit();
  }

  get name() {
    return this.customWeaponForm.get('name') as FormControl;
  }

  get minStr() {
    return this.customWeaponForm.get('minStr');
  }

  get dmg() {
    return this.customWeaponForm.get('dmg');
  }

  get attribute() {
    return this.customWeaponForm.get('attribute');
  }

  get weight() {
    return this.customWeaponForm.get('weight');
  }

  get iniBonus() {
    return this.customWeaponForm.get('iniBonus');
  }

  get special() {
    return this.customWeaponForm.get('special');
  }
}
