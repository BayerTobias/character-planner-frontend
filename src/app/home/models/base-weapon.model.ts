import { WeaponGroup, WeaponGroupData } from './weapon-group.model';

export interface BaseWeaponData {
  id: number;
  name: string;
  weapon_group: WeaponGroupData[];
  min_str: number;
  dmg: number;
  attribute: string;
  weight: number;
  ini_bonus: number;
}

export class BaseWeapon {
  id: number | null;
  name: string;
  weaponGroups: WeaponGroup[];
  minStr: number;
  dmg: number;
  attribute: string;
  weight: number;
  iniBonus: number;

  constructor(data?: BaseWeaponData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.weaponGroups = (data?.weapon_group || []).map(
      (weaponGroup: WeaponGroupData) => new WeaponGroup(weaponGroup)
    );
    this.minStr = data?.min_str || 0;
    this.dmg = data?.dmg || 0;
    this.attribute = data?.attribute || 'ST/GE';
    this.weight = data?.weight || 0;
    this.iniBonus = data?.ini_bonus || 0;
  }

  asJason() {
    return {
      id: this.id,
      name: this.name,
      weaponGroups: this.weaponGroups.map((group) => group.asJason()),
      minStr: this.minStr,
      dmg: this.dmg,
      attribute: this.attribute,
      weight: this.weight,
      iniBonus: this.iniBonus,
    };
  }
}
