export interface BaseArmorData {
  name: string;
  min_str: number;
  weight: string;
  armor_bonus: number;
  maneuver_bonus: number;
}

export class BaseArmor {
  name: string;
  minStr: number;
  weight: number;
  armorBonus: number;
  maneuverBonus: number;

  constructor(data?: BaseArmorData) {
    this.name = data?.name || '';
    this.minStr = data?.min_str || 0;
    this.weight = data?.weight ? parseFloat(data?.weight) : 0;
    this.armorBonus = data?.armor_bonus || 0;
    this.maneuverBonus = data?.maneuver_bonus || 0;
  }
}
