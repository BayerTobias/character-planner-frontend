import { WeaponGroup, WeaponGroupData } from './weapon-group.model';

export interface BaseWeaponData {
  name: string;
  group: WeaponGroupData[];
  min_str: number;
  dmg: number;
  attribute: string;
  weight: number;
  ini_bonus: number;
}

export class BaseWeapon {
  name: string;
  weaponGroups: WeaponGroup[];
  minStr: number;
  dmg: number;
  attribute: string;
  weight: number;
  iniBonus: number;

  constructor(data: BaseWeaponData) {
    this.name = data?.name || '';
    this.weaponGroups = (data.group || []).map(
      (weaponGroup: WeaponGroupData) => new WeaponGroup(weaponGroup)
    );
    this.minStr = data?.min_str || 0;
    this.dmg = data?.dmg || 0;
    this.attribute = data?.attribute || 'ST/GE';
    this.weight = data?.weight || 0;
    this.iniBonus = data?.ini_bonus || 0;
  }
}
