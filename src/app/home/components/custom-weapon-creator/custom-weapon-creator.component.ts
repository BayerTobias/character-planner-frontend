import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GameDataService } from '../../../shared/services/game-data.service';
import { CustomWeapon } from '../../models/custom-weapon.model';
import { WeaponGroup } from '../../models/weapon-group.model';
import { CommonModule } from '@angular/common';
import { CharacterDataService } from '../../../shared/services/character-data.service';

@Component({
  selector: 'app-custom-weapon-creator',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './custom-weapon-creator.component.html',
  styleUrl: './custom-weapon-creator.component.scss',
})
export class CustomWeaponCreatorComponent {
  public customWeaponForm: FormGroup;

  private fb = inject(FormBuilder);
  public gameDataService = inject(GameDataService);
  private characterDataService = inject(CharacterDataService);

  public selectedWeaponGroups: WeaponGroup[] = [];

  private customWeapon: CustomWeapon = new CustomWeapon();

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
    this.fillCustomWeaponObject();

    if (this.customWeapon.id) {
      console.log('update weapon');
    } else {
      const character = this.characterDataService.character;

      if (character) {
        character.customWeapons.push(this.customWeapon);

        // console.log(character.asPostRequestJson());

        try {
          const resp = await this.characterDataService.uploadCharacter(
            character
          );
          console.log(resp);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  fillCustomWeaponObject() {
    this.customWeapon.name = this.name?.value;
    this.customWeapon.minStr = this.minStr?.value;
    this.customWeapon.dmg = this.dmg?.value;
    this.customWeapon.attribute = this.attribute?.value;
    this.customWeapon.weight = this.weight?.value;
    this.customWeapon.iniBonus = this.iniBonus?.value;
    this.customWeapon.special = this.special?.value;
    this.customWeapon.weaponGroups = this.selectedWeaponGroups;
  }

  get name() {
    return this.customWeaponForm.get('name');
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
