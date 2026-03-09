import { BaseArmorRequestDto } from '../../shared/api/dtos/items/base-armor-request.dto';

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

  constructor(data: BaseArmorData) {
    this.id = data.id;
    this.name = data.name;
    this.minStr = data.min_str;
    this.weight = Number(data.weight);
    this.armorBonus = data.armor_bonus;
    this.maneuverBonus = data.maneuver_bonus;
    this.type = data.type;
  }

  asJason(): BaseArmorRequestDto {
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
