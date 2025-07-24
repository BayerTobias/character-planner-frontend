import { WeaponGroup, WeaponGroupData } from './weapon-group.model';

export interface CustomWeaponData {
  id: number;
  name: string;
  weapon_group: WeaponGroupData[];
  min_str: number;
  dmg: number;
  attribute: string;
  weight: number;
  ini_bonus: number;
  special: string;
}

export class CustomWeapon {
  id: number | null;
  name: string;
  weaponGroups: WeaponGroup[];
  minStr: number;
  dmg: number;
  attribute: string;
  weight: number;
  iniBonus: number;
  special: string;

  constructor(data?: CustomWeaponData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.weaponGroups =
      (data?.weapon_group || []).map(
        (weaponGroup: WeaponGroupData) => new WeaponGroup(weaponGroup)
      ) || [];
    this.minStr = data?.min_str || 0;
    this.dmg = data?.dmg || 0;
    this.attribute = data?.attribute || '';
    this.weight = data?.weight || 0;
    this.iniBonus = data?.ini_bonus || 0;
    this.special = data?.special || '';
  }

  asJason() {
    return {
      id: this.id,
      name: this.name,
      weapon_group: this.weaponGroups.map((group) => group.id),
      min_str: this.minStr,
      dmg: this.dmg,
      attribute: this.attribute,
      weight: this.weight,
      ini_bonus: this.iniBonus,
      special: this.special,
    };
  }
}
