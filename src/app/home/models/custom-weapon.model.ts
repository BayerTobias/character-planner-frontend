import { WeaponGroup, WeaponGroupData } from './weapon-group.model';

export interface CustomWeaponData {
  id: number;
  name: string;
  group: WeaponGroupData[];
  min_str: number;
  dmg: number;
  attribute: string;
  weight: string;
  ini_bonus: number;
  special: string;
}

export class CustomWeapon {
  id: number;
  name: string;
  weaponGroups: WeaponGroup[];
  minStr: number;
  dmg: number;
  attribute: string;
  weight: number;
  iniBonus: number;
  special: string;

  constructor(data: CustomWeaponData) {
    this.id = data?.id || -1;
    this.name = data?.name || '';
    this.weaponGroups = (data.group || []).map(
      (weaponGroup: WeaponGroupData) => new WeaponGroup(weaponGroup)
    );
    this.minStr = data?.min_str || 0;
    this.dmg = data?.dmg || 0;
    this.attribute = data?.attribute || 'ST/GE';
    this.weight = data?.weight ? parseFloat(data?.weight) : 0;
    this.iniBonus = data?.ini_bonus || 0;
    this.special = data?.special || '';
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
      special: this.special,
    };
  }
}
