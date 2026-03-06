export interface CustomWeaponRequestDto {
  id: number | null;
  name: string;
  weapon_group: number[];
  min_str: number;
  dmg: number;
  attribute: string;
  weight: number;
  ini_bonus: number;
  special: string;
}
