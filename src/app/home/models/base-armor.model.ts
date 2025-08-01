export interface BaseArmorData {
  id: number;
  name: string;
  min_str: number;
  weight: string;
  armor_bonus: number;
  maneuver_bonus: number;
  type: string;
}

export class BaseArmor {
  id: number | null;
  name: string;
  minStr: number;
  weight: number;
  armorBonus: number;
  maneuverBonus: number;
  type: string;

  constructor(data?: BaseArmorData) {
    this.id = data?.id || null;
    this.name = data?.name || '';
    this.minStr = data?.min_str || 0;
    this.weight = data?.weight ? parseFloat(data?.weight) : 0;
    this.armorBonus = data?.armor_bonus || 0;
    this.maneuverBonus = data?.maneuver_bonus || 0;
    this.type = data?.type || '';
  }

  asJason() {
    return {
      id: this.id,
      name: this.name,
      minStr: this.minStr,
      weight: this.weight,
      armorBonus: this.armorBonus,
      maneuverBonus: this.maneuverBonus,
      type: this.type,
    };
  }
}
