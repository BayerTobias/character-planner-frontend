import { FormGroup } from '@angular/forms';
import { CustomWeapon } from '../models/custom-weapon.model';

export class CustomWeaponFactory {
  static fromForm(form: FormGroup): CustomWeapon {
    const weapon = new CustomWeapon();

    weapon.name = form.get('name')?.value;
    weapon.minStr = form.get('minStr')?.value;
    weapon.dmg = form.get('dmg')?.value;
    weapon.attribute = form.get('attribute')?.value;
    weapon.weight = form.get('weight')?.value;
    weapon.iniBonus = form.get('iniBonus')?.value;
    weapon.special = form.get('special')?.value;

    return weapon;
  }

  static updateWeapon(weaponToUpdate: CustomWeapon, form: FormGroup) {
    const weapon = new CustomWeapon();

    weapon.id = weaponToUpdate.id;
    weapon.name = form.get('name')?.value;
    weapon.minStr = form.get('minStr')?.value;
    weapon.dmg = form.get('dmg')?.value;
    weapon.attribute = form.get('attribute')?.value;
    weapon.weight = form.get('weight')?.value;
    weapon.iniBonus = form.get('iniBonus')?.value;
    weapon.special = form.get('special')?.value;

    return weapon;
  }
}
