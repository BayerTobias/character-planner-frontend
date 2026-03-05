export interface BaseArmorRequestDto {
  id: number | null;
  name: string;
  minStr: number;
  weight: number;
  armorBonus: number;
  maneuverBonus: number;
  type: string;
}
